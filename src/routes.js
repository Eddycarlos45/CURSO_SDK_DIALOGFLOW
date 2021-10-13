const dialogflow = require("dialogflow");
const uuid = require("uuid");
const  Intent  = require('./utils/IntentBuild')

// -----Sessions Client -----
const projectId = 'curso-sdk-aibp';
const sessionId = uuid.v4();
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// -----Intents Client -----
const intentsClient = new dialogflow.IntentsClient();
const projectAgentPath = intentsClient.projectAgentPath(projectId);

module.exports = (routes) => {

  routes.get('/chat', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/views/chat.html')
  })

  routes.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
  })


  routes.post('/detectIntent', (req, res) => {

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


  routes.get('/getIntents', async (req, res) => {
    let [results] = await getIntents()

    res.json(results)
  });

  routes.get('/createIntent', async (req, res) => {
    try {
      let result = await createIntent();
      res.json(result);
    } catch (error) {
      console.log(error)
    }

  })

  async function createIntent() {
    const intent = Intent();
    let params = {
      parent: projectAgentPath,
      intent: intent
    }

    const [result] = await intentsClient.createIntent(params);

    return result
  }

  async function getIntents() {
    let params = {
      intentView: 'INTENT_VIEW_FULL',
      parent: projectAgentPath
    }
    return await intentsClient.listIntents(params);
  }

}
