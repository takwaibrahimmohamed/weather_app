
let get_location = document.querySelector('.submit');
let input = document.querySelector('.cname');
let details_weather= document.querySelector('.details')
let back = document.querySelector(".pop_up h2 i")
let popup = document.querySelector('.pop_up')
let maintemp = document.querySelector('.deg')
let feellike = document.querySelector('.feellike')
let humid=document.querySelector('.humid')
let stateWeather = document.querySelector('.info p')
let countryWeather = document.querySelector('.info .country')
let maincountryWeather = document.querySelector('.info p')
let img = document.querySelector('.img img')

console.log(img.src)
const API_KEY = `9eff8b29134e0649e346c86ef26f4462`;
let url
window.addEventListener('DOMContentLoaded',()=>{
    input.focus()
})

input.addEventListener('keyup',(e)=>{
   if(e.key =='Enter'){
    getCity(input.value)
   }
   
    
})
function getCity(city){
   
    if(input.value !=''){
        
        details_weather.classList.add('display')
         url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{  
            if(result.cod==404){
                details_weather.innerHTML = `${input.value} isn't avalid location`
                let x = setTimeout(() => {
                    popup.classList.remove('active')
                }, 3000);
            }      
           else{
            details_weather.innerHTML = "getting weather details "
            details_weather.classList.add('display')
            let x = setTimeout(() => {
                popup.classList.add('active')
            }, 3000);
            getInfo(result) 
           }
                    
        })
       
    }
 else{
    alert('Please enter country')
 }

}
get_location.addEventListener('click',()=>{
    getDeviceLocation()
    getLocation()
})
function getDeviceLocation(){
    let x = setTimeout(() => {
        popup.classList.add('active')
    }, 3000);
    details_weather.innerHTML = "getting weather details "
    details_weather.classList.add('display')

}
back.addEventListener('click',()=>{
    goBackmain()
})


function goBackmain(){
    input.value =""
    popup.classList.remove('active')
    details_weather.classList.remove('display')
}





// detect location


function getLocation(){
    if(!navigator.geolocation){
        alert("Geolocation API not supported by this browser")
    }
    else{
        navigator.geolocation.getCurrentPosition(succ,fail)
    }
}

function succ(position){
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
   .then((res)=>res.json())
   .then((result)=>{
    getInfo(result)
   })
}
function fail(){
console.log("reject")
}







// get all info about weather


function getInfo(dusc){
    let temp = Math.trunc(dusc.main.temp) +"°c"
    let humidity = dusc.main.humidity + "%"
    let feels_like = Math.round(dusc.main.feels_like)+"°c"
   maintemp.innerHTML =temp
   feellike.innerHTML = feels_like
   humid.innerHTML=humidity
   countryWeather.innerHTML = dusc.name +","+dusc.sys.country
   stateWeather.innerHTML = dusc.weather[0].description
   let id = dusc.weather[0].id
if(id>=200 && id<=232){
img.src = 'http://127.0.0.1:5500/images/storm.svg'
}
else if(id>=500 && id<=531){
img.src = 'http://127.0.0.1:5500/images/rain.svg'
}
else if(id>=600 && id<=622){
img.src = 'http://127.0.0.1:5500/images/snow.svg'
}
else if(id ==721){
    img.src = 'http://127.0.0.1:5500/images/haze.svg'
}
else if(id ==800){
    img.src = 'http://127.0.0.1:5500/images/clear.svg'
}
else if(id >=801 && id<=804){
    img.src = 'http://127.0.0.1:5500/images/cloud.svg'
}

}




