require('dotenv').config()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import appConfig from './configs/appConfig'
import mbtiRouter from './routes/mbtiRouter'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.send('OK')
})

app.use('/mbti', mbtiRouter)


/**
 * Start Express server.
 */
const server = app.listen(appConfig.PORT, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    appConfig.PORT,
    appConfig.NODE_ENV,
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server