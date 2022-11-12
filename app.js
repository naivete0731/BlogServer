const express = require('express')
const path = require('path')
const app = express()

app.use((req,res) => {
  res.send('ok')
})

app.listen(3000, () => console.log('localhost:3000'))