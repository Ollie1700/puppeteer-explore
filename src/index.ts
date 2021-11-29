// Import the puppeteer package
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import findAndClickButton from './findAndClickButton'

// Create an "async" environment so we can use "await"
;(async () => {

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
    await page.waitForTimeout(5000)
    await page.screenshot({
      path: './screenshots/pre_cookies3.png'
    })

    const keywords = [
      'accept',
      'agree',
      'allow',
    ]

    // Get iframe or normal page, depending if iframe was found
    let result
    const iframe = await page.$('iframe[src*="trustarc.com"]')
    if (iframe) {
      const frame = await iframe.contentFrame()
      if (frame) {
        result = await frame.evaluate(findAndClickButton, keywords)
      }
    }
    else {
      result = await page.evaluate(findAndClickButton, keywords)
    }

    console.log(`Found button: ${result}`)
    
    await page.waitForTimeout(3000)
    await page.screenshot({
      path: './screenshots/post_cookies3.png'
    })

    // Let the user know we're done
    console.log('Done!')
  })()
