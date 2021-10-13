let trainingPhrases = [
  {
    type: 'EXAMPLE',
    parts: [
      {
        text: "como agendar aula"
      },
      {
        text: "hoje",
        entityType: "@sys.date-time",
        alias: "data-agendamento"
      }
    ]
  }
]
let responses = [
  {
    text: {
      text: ['Sua aula foi agendada', 'Aula agendada com sucesso']
    }
  }
]

let parameters = [
  {
    displayName: 'data-agendamento',
    entityTypeDisplayName: '@sys.data-time',
    mandatory: true,
    prompts: ['Para quando você quer a aula?', 'Quando seria a aula?']
  }
]

module.exports = () => {
  const intent = {
    displayName: 'agendar_aula',
    webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
    trainingPhrases: trainingPhrases,
    messages: responses,
    parameters: parameters
  }
  return intent
}