// Import the puppeteer package
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import findAndClickButton from './findAndClickButton'

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
    await page.goto('https://www.asda.com')
    await page.waitForTimeout(5000)
    await page.screenshot({
      path: './screenshots/pre_cookies3.png'
    })

    const keywords = [
      'accept all cookies',
      'accept all',
      'ok',
      'accept all cookies and continue',
      'accept all and continue',
      'allow all',
      'okay, thanks',
      'agree',
      'i accept',
      'accept cookies',
      'accept',
      'accept and close',
      'allow cookies',
      'allow all cookies',
      'i accept all cookies',
    ]

    // Get iframe or normal page, depending if iframe was found
    let result
    const iframe = await page.$('iframe[src*="trustarc.com"]')
    if (iframe) {
      const frame = await iframe.contentFrame()
      console.log("usingiFrame")
      if (frame) {
        result = await frame.evaluate(findAndClickButton, keywords)
      }
    }
    else {
      result = await page.evaluate(findAndClickButton, keywords)
    }
    
    console.log(`Found button: ${result}`)

    await page.waitForTimeout(5000)
    await page.screenshot({
      path: './screenshots/post_cookies3.png'
    })
    let isShopify = await page.evaluate(() => {
      try {
        // @ts-ignore
        const shopify = Shopify
        console.log(`Is shopify: ${!!shopify}`)
        return !!shopify
      } catch (error) {
        return false
      }
    })

    
    // Let the user know we're done
    console.log('Done!')
    console.log(isShopify ? "is Shopify!" : "isn't Shopify")
    await browser.close()
  })()
