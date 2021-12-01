
export default function findAndClickButton(keywords: string[]) {
  // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

  const allElements = document.querySelectorAll('*')
  for (let i = 0; i < allElements.length; i++) {
    const element: any = allElements[i]
    if (element.id === "onetrust-accept-btn-handler") {
      console.log(element.innerText)
   }
    if (element && element.innerText) {
      const elementContainsKeyword = keywords.some(word => element.innerText.toLowerCase().trim() === word)
      if ((elementContainsKeyword)) {
        element.click()
        return true
      }
    } 
    return false
  }
}
