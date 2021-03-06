'use strict'
import c3 from 'c3'

const surfline_data = () => {

  let output = document.getElementById('output')
  let spot_analysis = document.getElementById('spot_analysis')
  let spot_analysis_container = document.getElementById('spot_analysis_container')
  let meta_data = {}

  let reqListener = (res) => {
    let parsed_res = JSON.parse(res.currentTarget.response.toLowerCase())
    console.log(parsed_res,'meeeeeeeee')
    let surf_analysis = document.createElement('div')
    surf_analysis.innerHTML = parsed_res.analysis.short_term_forecast
    spot_analysis_container.innerHTML = `<img src="http://camstills.cdn-surfline.com/saltcreekcam/latest_full.jpg" />`
    spot_analysis.appendChild(surf_analysis)

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
      datestamp_arr: datestamp_arr,
      surf_min_arr: surf_min_arr,
      surf_max_arr: surf_max_arr
    }

    display_data(meta_data)
    chart_generator(meta_data)
    return meta_data

  }

  let surf_button = document.getElementById('check-surf')
  surf_button.addEventListener('click', ()=>{
    var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://api.surfline.com/v1/forecasts/4233?resources=surf,analysis,sort&days=25&getAllSpots=false&units=e&usenearshore=true");
      oReq.setRequestHeader('Content-Type', 'application/json');
      oReq.send();
  })

  let display_data = (data)=>{
    let datestamp_holder = document.getElementById('datestamp_holder')
    let min_surf_holder = document.getElementById('min_surf_holder')
    let max_surf_holder = document.getElementById('max_surf_holder')
    data.datestamp_arr.map((el,index)=>{
      let date = document.createElement('div')
      date.id = `datestamp_${index}`
      date.innerHTML = el
      datestamp_holder.appendChild(date)
    })
    data.surf_min_arr.map((el,index)=>{
      let min_surf = document.createElement('div')
      min_surf.id = `min_surf_${index}`
      min_surf.innerHTML = `min: ${el} feet`
      min_surf_holder.appendChild(min_surf)
    })
    data.surf_max_arr.map((el,index)=>{
      let max_surf = document.createElement('div')
      max_surf.id = `max_surf_${index}`
      max_surf.innerHTML = `max: ${el} feet`
      max_surf_holder.appendChild(max_surf)
    })
  }

  let chart_generator = (data)=>{
    console.log(data,'data in da data')
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                data.surf_max_arr
            ]
        },
        zoom: {
            enabled: true
        }
    });
  }

  return meta_data

}

console.log('surfline data bitches')

export default surfline_data