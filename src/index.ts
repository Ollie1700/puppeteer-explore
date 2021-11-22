// Import the puppeteer package
import puppeteer from 'puppeteer'

// Create an "async" environment so we can use "await"
;(async () => {

  // Create a virtual browser using puppeteer - this is the equivalent of opening up Chrome on your PC
  const browser = await puppeteer.launch({
    // Config that we don't need to worry about yet
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  // Create a virtual "page" - this is the equivalent of opening a new tab in your Chrome browser
  const page = await browser.newPage()

  // Navigate to a website (feel free to change the website) - this is the equivalent of typing in an address and hitting enter in Chrome
  await page.goto('https://google.co.uk')

  // Take a screenshot so we can see what Puppeteer "sees"
  await page.screenshot({
    path: './screenshots/test.png',
    fullPage: true
  })

  // We can use the "evaluate" method to execute JavaScript on the website - this is the equivalent of typing JS into the Chrome console
  const result = await page.evaluate(() => {
    // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

    // Find the Google logo on the page
    const logo = document.querySelector('img[alt="Google"]')

    // Return true/false depending if the logo was found
    return !! logo
  })

  console.log(`Did we find the Google logo? ${result}`)

  // Let the user know we're done
  console.log('Done!')
})()
