'use strict'

let output = document.getElementById('output')

let reqListener = (res) => {
  let surf = JSON.parse(res.currentTarget.response.toLowerCase())
  console.log(surf.surf.surf_max)
  output.innerHTML = surf.surf.surf_max
  surf.surf.surf_max.map((el,index)=>{
    let max_surf = document.createElement('p')
    max_surf.id = `max_surf_day_${index}`
    max_surf.innerHTML = el
    output.appendChild(max_surf)
  })

}

let surf_button = document.getElementById('check-surf')
surf_button.addEventListener('click', ()=>{
  var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://api.surfline.com/v1/forecasts/4750?resources=surf,analysis,sort&days=25&getAllSpots=false&units=e&usenearshore=true");
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send();
})
console.log(surf_button)
