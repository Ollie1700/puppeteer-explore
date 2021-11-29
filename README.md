# Installation

1. Clone this project into an empty folder: `git clone https://github.com/ollie1700/puppeteer-explore`
2. Install: `npm i`
3. Run the test app: `npm run dev` (note that the app will automatically restart when changes are made and saved)
4. See if you can view the test screenshot under `/screenshots/test.png`
5. If you can see a screenshot of Google, we're good to go!

# Tasks

The main code is run on `./src/index.ts` - all tasks can be done in this one file.

1. Find 3 sites with cookie popups - test them all with the button finding logic and compare the pre/post cookie screenshots. If the post cookie screenshot still has the CMP, did it find the wrong element based on the text? etc.

2. Implement the same thing but with the iframe snippet so we click a button within the iframe. Test using: https://plus.net
