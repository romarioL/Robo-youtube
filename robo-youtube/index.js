const readline = require('readline-sync')
const robots = {
   text: require('./robots/texts.js'),
   state: require('./robots/state.js'),
   input: require('./robots/input.js'),
}

 async function start() {
     robots.input()
     await robots.text()

     const content2 = robots.state.load()
     console.dir(content2, { depth: null })
     
      
}




start()