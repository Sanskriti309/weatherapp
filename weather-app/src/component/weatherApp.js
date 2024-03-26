import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
function WeatherApp() {

    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [name, setName] = useState();
    const [data, setData] = useState({
        temperature: "",
        humidity: "",
        visibility: "",
        windSpeed: "",
        type: "",
        image: "/images/WeatherIcons.gif"
    })
    const [error, setError] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function getCurrentDateTime() {
        const now = new Date();

        const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const dateString = `${days[now.getDay()]
            }, ${now.getDate()} ${now.toLocaleDateString("en-US", {
                month: "long",
            })} ${now.getFullYear()}`;

        return { timeString, dateString };
    }

    const searchWeather =()=>{
        if (name!==""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f95f858a73bdec7a04dad57bfdfb8e56&units=metric`
            axios.get(apiUrl)
            .then(result=>{
                let imagePath='';
                if(result.data.weather[0].main==="Fog"){
                    imagePath="/images/fog.jpg"
                }
                else if(result.data.weather[0].main==="Haze"){
                    imagePath="/images/clear.png"
                }
                else if(result.data.weather[0].main==="Clear"){
                    imagePath="/images/clear.png"
                }
                else if(result.data.weather[0].main==="Mist"){
                    imagePath="/images/mist.png"
                }
                else if(result.data.weather[0].main==="Smoke"){
                    imagePath="/images/smoke.png"
                }
                else if(result.data.weather[0].main==="Rain"){
                    imagePath="/images/rain.png"
                }
                else if(result.data.weather[0].main==="Drizzle"){
                    imagePath="/images/drizzle.png"
                }
                else if(result.data.weather[0].main==="Wind"){
                    imagePath="/images/wind.png"
                }
                else if(result.data.weather[0].main==="Clouds"){
                    imagePath="/images/clouds.png"
                }
                else{
                    imagePath="/images/WeatherIcons.gif"
                }
                setData({...data,temperature:result.data.main.temp,humidity:result.data.main.humidity,visibility:result.data.visibility,windSpeed:result.data.wind.speed,type:result.data.weather[0].main,image:imagePath})
            })
            .catch(err=>{
                if(err.response.status===404){
                    setError("Sahi Namm likh re kutreya")
                }
            })
        }
    }

    return (
        <div>
            <div className="section main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="box d-flex">
                            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>
                            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 me-4 image-box">
                                <div className="place">{name}</div>
                                <div className="time">
                                    {currentDateTime.timeString}
                                    <span className="day"> {currentDateTime.dateString}</span>

                                </div>
                                <div className="temp"> {Math.round(data.temperature)}&deg;C</div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 text-white hero">
                                <img src={data.image} />
                                <h2 className="">{data.type}</h2>
                                <hr className="ms-5 me-5"></hr>
                                <input type="text" className="search-box ps-3 mt-4 ms-4" placeholder="Search by city" onChange={(e) => setName(e.target.value)} />
                                <button className="icon-button" onClick={searchWeather} ><FontAwesomeIcon icon={faSearch} className="icon p-3" /></button>
                                <div className="error">
                                    <p className="text-danger">{error}</p>
                                </div>
                                <div>
                                    <ul className="mt-5 ms-2 me-5">
                                        <li className="mb-2 p-2">{name}</li>
                                        <li className="mb-2 list p-3">
                                            Temperature
                                            <span>{Math.round(data.temperature)}</span>
                                        </li>
                                        <li className="mb-2 list p-3">
                                            Humidity
                                            <span>{Math.round(data.humidity)}</span>
                                        </li>
                                        <li className="mb-2 list p-3">
                                            Visibility
                                            <span>{data.visibility}</span>
                                        </li>
                                        <li className="mb-2 list p-3">
                                            Wind Speed
                                            <span>{Math.round(data.windSpeed)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WeatherApp;