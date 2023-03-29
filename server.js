const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('all of yall nwords can suck a caterpillar dick')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})