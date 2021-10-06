const customExpress = require('./customExpress')
const dialogflow = require("dialogflow");
const uuid = require("uuid");
const dotenv = require('dotenv');

const app = customExpress();
const projectId = 'curso-sdk-aibp';
const sessionId = uuid.v4();
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const result = dotenv.config()

if (result.error) {
  throw result.error
}

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/views/chat.html')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})


app.post('/detectIntent', (req, res) => {

  let texto = req.body.texto
  const query = {
    session: sessionPath,
    queryInput: {
      text: {
       text: texto,
       languageCode: 'pt-br' 
      }
    }
  }
  
  sessionClient.detectIntent(query)
  .then((result) => {
  res.send(result)
  }).catch((err) => console.log(err))
  
})

app.listen(3000, () => {
  console.log('server is running')
})