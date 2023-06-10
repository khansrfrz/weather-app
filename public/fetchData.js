const API_key = "4f05afbdaefe905c977b1509a258396b"

fetch(`https://api.openweathermap.org/data/2.5/weather?q=bhilai&appid=${API_key}&units=metric`)
.then((data)=> data.json())

.then((jsonData)=>{
    // console.log(jsonData.name);
    // console.log(jsonData.main.temp);
    // console.log(jsonData.main.feels_like);
    // console.log(jsonData.weather[0].description);
    fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
    .then((res)=> res.blob())
    .then((result)=> {
        document.getElementById("text_location").innerHTML = jsonData.name
        document.getElementById("text_location_country").innerHTML = jsonData.sys.country
        document.getElementById("text_temp").innerHTML = Math.round(jsonData.main.temp)
        document.getElementById("text_feelslike").innerHTML = Math.round(jsonData.main.feels_like) 
        document.getElementById("text_desc").innerHTML = jsonData.weather[0].description

        const imageObjectURL = URL.createObjectURL(result);
        document.getElementById("icon").src = imageObjectURL
    })

    
})
