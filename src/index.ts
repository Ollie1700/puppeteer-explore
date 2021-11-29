// Import the puppeteer package
import puppeteer from 'puppeteer'

// Create an "async" environment so we can use "await"
;(async () => {

  // Create a virtual browser using puppeteer - this is the equivalent of opening up Chrome on your PC
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  // Create a virtual "page" - this is the equivalent of opening a new tab in your Chrome browser
  const page = await browser.newPage()

  // IFRAME LINK: https://www.plus.net
  await page.goto('https://www.waterstones.com')

  // get iframe
  // const iframe = await page.$('iframe[src*="trustarc.com"]')
  // if (iframe) {
  //   const frame = await iframe.contentFrame()
  //   if (frame) {
  //     await frame.evaluate(() => {
  //       // FIND BUTTON WITH SAME LOGIC
  //     })
  //   }
  // }

  await page.waitForTimeout(2000)

  // Take a screenshot so we can see what Puppeteer "sees"
  await page.screenshot({
    path: './screenshots/pre_cookies.png'
  })

  // We can use the "evaluate" method to execute JavaScript on the website - this is the equivalent of typing JS into the Chrome console
  const keywords = [
    'accept',
    'cookies',
    'accept all',
    'ok',
    'okay'
  ]
  
  const result = await page.evaluate((keywords) => {
    // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

    const allElements = document.querySelectorAll('*')

    for (let i = 0; i < allElements.length; i++) {
      const element: any = allElements[i]
      if (keywords.includes(element.innerText.toLowerCase())) {
        element.click()
        return true
      }
    }

    return false
  }, keywords)

  console.log(`Found button: ${result}`)

  await page.waitForTimeout(2000)

  await page.screenshot({
    path: './screenshots/post_cookies.png'
  })

  // Let the user know we're done
  console.log('Done!')
})()
