import React, { useEffect, useState } from 'react'
import './Nav.css';


function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){handleShow(true);}
            else{handleShow(false);}
        })
        return ()=>{
            window.removeEventListener("scroll");
        }
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="NETFLIX"></img>
            <img className="nav__avatar" 
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/Bald_Man.svg" alt="AVATAR"></img>
        </div>
    )
}

export default Nav
