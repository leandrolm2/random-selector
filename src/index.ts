import express from 'express';
import bodyParser from 'body-parser';
import  router  from './routes/routes'
import dbConnection  from './db/config'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
dbConnection()
app.use(router)


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})

