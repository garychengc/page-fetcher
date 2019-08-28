const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



request(`${args[0]}`, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.;
  // console.log(response.socket.bytesRead); // this is the uncompressed bytes we get from the site.
  // console.log(response);
  



  fs.access(args[1], fs, (err) => {
    if (!err) {
      rl.question("The file exists. Overwrite? [Y]/[N]: ", answer => {
        if (answer === 'Y') {

          fs.writeFile(`${args[1]}`, body, (err)=> {
            if (err) console.log(err);
            console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
            process.exit();
        })} else if (answer === 'N') {
            process.exit();
        }
      })
    } else {
      fs.writeFile(`${args[1]}`, body, (err) => {
      if (err) console.log(err);
      console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
      process.exit();
      })
    }
  })
});
