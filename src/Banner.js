import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css'

const base_url = "https://image.tmdb.org/t/p/original"
function Banner() {

    const [banner, setbanner] = useState([])
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setbanner(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
            return request;
        }
        fetchData();
    }, [])

    function truncate(str, n = 150){
        return str?.length > n ? str.substr(0, n-1) + "..." :str;
    }
    
    return (
        <header className="banner" style={{ backgroundSize:"cover", backgroundImage: `url(${base_url}${banner?.backdrop_path})`, backgroundPosition: "center center"}}>
            <div className="banner__contents">
                <h1 className="banner__title">{banner?.name || banner?.title}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(banner?.overview)}</h1>
            </div>
            <div className="banner__fade"></div>
        </header>
    )
}

export default Banner
