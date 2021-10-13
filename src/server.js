const customExpress = require('./customExpress')
const dotenv = require('dotenv');

const app = customExpress();
const result = dotenv.config();

if (result.error) {
  throw result.error
}

app.listen(3000, () => {
  console.log('server is running')
})