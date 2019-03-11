const algorithmia  = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

 async function robot(content) {
  await fetchContentFromWikipedia(content)
  sanitizeContent(content)
  breakContentIntoSentences(content)

 console.log(fetchContentFromWikipedia())

async function fetchContentFromWikipedia() {
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
    const wikipediaContent = wikipediaResponde.get()
    

    content.sourceContentOriginal = wikipediaContent.content
 }

 function sanitizeContent() {
   const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
   const withoutDatesInParentesis = removeDatesInParentesis(withoutBlankLinesAndMarkdown)
   

   content.sourceContentSanitized =  withoutDatesInParentesis
 



   function removeBlankLinesAndMarkdown(text) {
   	  const allLines = text.split('\n')
   	  

   	  const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
   	  	if(line.trim().length === 0 || line.trim().startsWith('=')  ){
   	  		return false
   	  	}

   	  	return true
   	  })

   	  return withoutBlankLinesAndMarkdown.join(' ')
   }


   function removeDatesInParentesis(text) {
   	return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
   }


   
 }

 function breakContentIntoSentences(content) {
    content.sentences = []

    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
    sentences.forEach((sentence) => {
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: []
      })
    })
  }

}




module.exports = robot