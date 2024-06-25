
const city=document.querySelector(".main>h1")
const temp = document.querySelector(".main>div")
const desc = document.querySelector(".desc")
let subContainer = document.querySelector(".sub-container")
const input = document.querySelector("input")
const btn=document.querySelector("button")

async function getweathear(search) {
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=fef2f53d48f5e0756e6600e8d853c0f3`)
    const response = await api.json()
    
    const description= response.weather[0].description
    const icon=response.weather[0].icon
    const temp=response.main.temp
    const feels_like=response.main.feels_like
    const temp_min=response.main.temp_min
    const temp_max=response.main.temp_max
    const humidity=response.main.humidity
    const speed=response.wind.speed
    const country = response.sys.country
    const city = response.name
    
    return {
        description: description,
        icon: icon,
        temp: temp,
        country: country,
        city:city,
        feels_like: feels_like,
        temp_min: temp_min,
        temp_max: temp_max,
        humidity: humidity,
        speed: speed
    }
}


const data = async(search) => {
    
    let d=await getweathear(search)
    city.innerHTML = `${d.city},${d.country}`
    temp.innerHTML = `<span>${d.temp}</span>&deg;C`
    desc.innerHTML = `<span><img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" alt=""> </span> <h5>${d.description}</h5>`
    const arr = Object.keys(d)
    arr.splice(0, 5)
    for (const key of arr) {
        const div=document.createElement("div")
        div.innerHTML = `<div><span>${d[key]}</span> <h3 >${key}</h3></div>`
        subContainer.appendChild(div)
    }
}

btn.addEventListener("click",async () => {
    
    search=input.value
    d=await getweathear(search)
    subContainer.innerHTML=""
        data(search)
    
    
})
data("delhi")