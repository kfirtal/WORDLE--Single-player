const express = require('express');
const bodyParser = require('body-parser');
const randomWords = require('random-words')

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');

app.use(session({
  secret: 'bulbul',
  resave: false,
  saveUninitialized: true
}));

let response = {
  win : false,
  feedback : ['-','-','-','-','-']
}


let word = GenerateWord()

// Set up the routes

app.get('/', (req, res) => {     
  // Generate a random word
  response = {
    win : false,
    feedback : ['-','-','-','-','-']
  }

  word = GenerateWord()

  res.render('bla', { });
});

app.get('/check/:guess', (req, res) => {
  let guess=req.params.guess;

  // Check if the guess is correct
  if (guess == word){
    response['win']   = true;
  }
    for (let i = 0; i < word.length; i++) {
      if (guess[i] === word[i]) {
        response['feedback'][i] = 'O';
      } else if (word.includes(guess[i])) {
        response['feedback'][i] = 'X';
      } else {
        response['feedback'][i] = '-';
      }
   }

  // Render the updated page
  res.send(response);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


function GenerateWord(){
  let word = ' '
  while(word.length!=5)
   word = randomWords();
  
  console.log(word);  
  return word;
}