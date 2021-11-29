
export default function findAndClickButton(keywords: string[]) {
  // Any code inside of here is executed on the PAGE - we cannot mix and match variables inside here with our Node project outside

  const allElements = document.querySelectorAll('*')

  for (let i = 0; i < allElements.length; i++) {

    const element: any = allElements[i]
    if (element && element.innerText) {
      
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
}
