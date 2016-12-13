const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

let reqListener = (data) =>  {
  console.log(data)
  console.log(this.responseText);
}

const app = document.getElementById('root')
const butt = document.createElement('button')

butt.addEventListener('click', function(){
  let oReq = new XMLHttpRequest()
    oReq.addEventListener("load", reqListener)
    oReq.open("GET", "http://api.surfline.com/v1/forecasts/4750?resources=surf,analysis,sort&days=25&getAllSpots=false&units=e&usenearshore=true")
    oReq.send()
})
app.appendChild(butt)
