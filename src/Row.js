import React, {useState, useEffect} from 'react'
import axios from './axios.js';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"
function Row({title, url, isLarge}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    useEffect(() => {
        async function fetchData(){
            if(url){
                const request = await axios.get(url);
                setMovies(request.data.results);
                return request;
            }
        }
        fetchData();
    }, [])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || "")
            .then(tempUrl => {
                const urlParams = new URLSearchParams(new URL(tempUrl).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img 
                    key={movie.id} 
                    onClick= {()=>{handleClick(movie)}}
                    className={`row__poster ${isLarge && "row__posterLarge"}`} src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}></img>
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} 
        </div>
    )
}

export default Row;
