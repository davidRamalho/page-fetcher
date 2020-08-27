const request = require('request');
const fs = require('fs');
const readline = require('readline');

const URL = process.argv[2];
const newFile = process.argv[3];


request(URL, (error, response, body) => {
  if (newFile) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(`${newFile} already exists, overwrite [Y]/[N]? `, (answer) => {
      if (answer === 'Y'){
        fs.writeFile(newFile, body, function (err) {
          console.log(`Downloaded and overwrote ${fs.statSync(newFile).size} bytes to ${newFile}`)
          if (err) {return console.log('There was an error');}
          } 
        )
        rl.close();
      } else if (answer === 'N') {
        console.log(`${newFile} not overwritten, request will now close.`)
        rl.close();
      }
    })
  }
});





