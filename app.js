const express = require('express')
const bp = require('body-parser')
const auth = require('./routes/auth')
const db = require('./database/db')
const records = require('./routes/records')
const app = express()
const port = 5000

db.connection()
app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(bp.urlencoded({ extended: true }))

app.use(bp.json())

app.use('/auth', auth)

app.use('/record', records)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

