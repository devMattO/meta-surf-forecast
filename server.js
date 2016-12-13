const express = require('express')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.send([{name: 'matt'},{age: 23}])
})

app.get('/surf', (req, res)=>{
  console.log(httpGet('http://api.surfline.com/v1/forecasts/4750?resources=surf,analysis,sort&days=25&getAllSpots=false&units=e&usenearshore=true'))
  res.send('What you need?');
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})