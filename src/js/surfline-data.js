'use strict'

const surfline_data = () => {

  let output = document.getElementById('output')
  let meta_data = {}

  let reqListener = (res) => {
    let parsed_res = JSON.parse(res.currentTarget.response.toLowerCase())
    console.log(parsed_res.surf)
    let surf_min_arr = []
    let surf_max_arr = []
    let datestamp_arr = []

    parsed_res.surf.surf_min.map((el,index)=>{
      surf_min_arr = surf_min_arr.concat(el)
    })

    parsed_res.surf.surf_max.map((el,index)=>{
      surf_max_arr = surf_max_arr.concat(el)
    })

    parsed_res.surf.datestamp.map((el,index)=>{
      datestamp_arr = datestamp_arr.concat(el)
    })

    meta_data = {
      surf_min_arr: surf_min_arr,
      surf_max_arr: surf_max_arr,
      datestamp_arr: datestamp_arr
    }

    display_data(meta_data)
    return meta_data

  }

  let surf_button = document.getElementById('check-surf')
  surf_button.addEventListener('click', ()=>{
    var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://api.surfline.com/v1/forecasts/4750?resources=surf,analysis,sort&days=25&getAllSpots=false&units=e&usenearshore=true");
      oReq.setRequestHeader('Content-Type', 'application/json');
      oReq.send();
  })

  let display_data = (data)=>{
    console.log(data,'deeeee data ')
  }

  return meta_data

}

console.log('surfline data bitches')

export default surfline_data