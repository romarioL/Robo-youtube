const readline = require('readline-sync')
const robots = {
   text: require('./robots/texts.js')
}

 async function start() {
   const content = {}

   content.searchTerm = askAndReturnSearchTerm()
   content.prefix = askAndReturnPrefix()

function askAndReturnSearchTerm() {
         return  readline.question('Type a wikipedia search term:')
      }

      function askAndReturnPrefix() {
         const prefixes = ['who is', 'What is', 'The history of']
         const SelectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:')
         const selectedPrefixText = prefixes[SelectedPrefixIndex]

         return selectedPrefixText
   }


       await robots.text(content)

   	robots.user

   	console.log(content)
}

start()