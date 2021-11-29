// Import the puppeteer package
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

  // Create an "async" environment so we can use "await"
  ; (async () => {

    // Create a virtual browser using puppeteer - this is the equivalent of opening up Chrome on your PC
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    })

    // Create a virtual "page" - this is the equivalent of opening a new tab in your Chrome browser
    const page = await browser.newPage()
    page.on('console', message => console.log(`[PAGE CONSOLE] ${message.text()}`))

    // IFRAME LINK: https://www.plus.net
    await page.goto('https://www.plus.net')
    const keywords = [
      'accept',
      'agree',
      'allow',
    ]

    await page.waitForTimeout(5000)

    // Take a screenshot so we can see what Puppeteer "sees"
    await page.screenshot({
      path: './screenshots/pre_cookies3.png'
    })

    // get iframe
    const iframe = await page.$('iframe[src*="trustarc.com"]')
    if (iframe) {
      const frame = await iframe.contentFrame()
      if (frame) {
        const result = await frame.evaluate((keywords: string[]) => {
          // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

          const allElements = document.querySelectorAll('*')

          for (let i = 0; i < allElements.length; i++) {
            const element: any = allElements[i]
            if (element && element.innerText) {
              // if (element.className === "base-components__BaseElement-sc-1mosoyj-0 styled__TextSpan-sc-3mnirm-4 gzHQpg beans-button__text")
              // console.log(element.innerText)
              const elementContainsKeyword = keywords.some(s => element.innerText.toLowerCase().includes(s))
              const elementHasOK = element.innerText.toLowerCase() === "ok"
              const elementArray = ['A', 'SPAN', 'BUTTON']
              const elementIsButton = elementArray.includes(element.tagName)
              if ((elementContainsKeyword || elementHasOK) && elementIsButton) {
                element.click()
                console.log(element.innerText)
                return true
              }
            }
          }


          return false
        }, keywords)
        console.log(`Found button: ${result}`)
        // Let the user know we're done
        console.log('Done!')
      }
    }
    await page.waitForTimeout(3000)
    await page.screenshot({
      path: './screenshots/post_cookies3.png'
    })


    // We can use the "evaluate" method to execute JavaScript on the website - this is the equivalent of typing JS into the Chrome console
    // const keywords = [
    //   'accept',
    //   'agree',
    //   'allow',
    // ]

    // const result = await page.evaluate((keywords: string[]) => {
    //   // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

    //   const allElements = document.querySelectorAll('*')

    //   for (let i = 0; i < allElements.length; i++) {
    //     const element: any = allElements[i]
    //     if (element && element.innerText){
    //       // if (element.className === "base-components__BaseElement-sc-1mosoyj-0 styled__TextSpan-sc-3mnirm-4 gzHQpg beans-button__text")
    //       // console.log(element.innerText)
    //       const elementContainsKeyword = keywords.some(s => element.innerText.toLowerCase().includes(s))
    //       const elementHasOK = element.innerText.toLowerCase() === "ok"
    //       const elementIsButton = element.tagName === 'BUTTON'
    //       const elementArray = ['a', 'span', '']
    //       if ((elementContainsKeyword || elementHasOK) && elementIsButton) {
    //         element.click()
    //         console.log(element.tagName)
    //         return true
    //       }
    //     }
    //   }


    //   return false
    // }, keywords)

    // console.log(`Found button: ${result}`)

    // await page.waitForTimeout(3000)

    // await page.screenshot({
    //   path: './screenshots/post_cookies3.png'
    // })

    // // Let the user know we're done
    // console.log('Done!')
  })()
