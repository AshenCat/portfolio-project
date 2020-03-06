const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const dbconf = require('./config/dbconf')

const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT_LOCAL || 3331

const logFileStreamPath = fs.createWriteStream(path.join(__dirname, 'logfile.txt'), {flags: 'a'})

mongoose.connect(dbconf.conf, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log(`connected to local db ${dbconf}`)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(morgan('combined', {stream: logFileStreamPath}))

app.get('/', (req, res, next) => res.send('gotcha'))

app.use((err, req, res, next) => {
    res.status(500).send()
})

app.listen(port, ()=>console.log(`listening at port ${port}`))