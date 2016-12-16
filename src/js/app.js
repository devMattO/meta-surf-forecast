'use strict'

let output = document.getElementById('output')

let reqListener = (res) => {
  let surf = JSON.parse(res.currentTarget.response.toLowerCase())
  console.log(surf.surf)
  surf.surf.surf_max.map((el,index)=>{
    let day_header = document.createElement('h1')
    day_header.id = `header_day_${index}`
    day_header.innerHTML = `Day ${index + 1}`
    output.appendChild(day_header)
    let max_surf = document.createElement('div')
    max_surf.id = `max_surf_day_${index}`
    el.map((el,index)=>{
      let max_surf_display = document.createElement('p')
      max_surf_display.id = `max_surf_display_${index}`
      max_surf_display.innerHTML = `max: ${el} feet`
      max_surf.appendChild(max_surf_display)
    })
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
