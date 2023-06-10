import { CircularProgress, Slide, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [cityName, setCityName] = useState("Bhilai");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4f05afbdaefe905c977b1509a258396b&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data)
      })
      .catch(()=> setError(true))
      .finally(()=> setLoading(false))
  }, [cityName, error]);

  const handleSearch=(e)=>{
    if(e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("")
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="bg_img">
      {!loading ? (
        <>
        <div><h1 className="title">Weather App</h1></div>
        <div className="date"><h2>{dateBuilder(new Date())}</h2></div>
        <TextField
        variant="filled"
        label="Search location"
        className="input"
        value={inputText}
        error={error}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleSearch}
      />
      <h1 className="city">{data.name}</h1>
      <div className="group">
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        <h1>{data.weather[0].main}</h1>
      </div>

      <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

      <Slide direction='right' timeout={800} in={!loading}>
      <div className="box_container">
        <div className="box">
          <p>Humidity</p>
          <h1>{data.main.humidity.toFixed()}%</h1>
        </div>

        <div className="box">
          <p>Wind Speed</p>
          <h1>{data.wind.speed.toFixed()} km/h</h1>
        </div>

        <div className="box">
          <p>Feels Like</p>
          <h1>{data.main.feels_like.toFixed()} °C</h1>
        </div>
      </div>
      </Slide>
        </>
      ) : (
        <CircularProgress/>
      )}
    </div>

  );
}

export default App;

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4f05afbdaefe905c977b1509a258396b`


