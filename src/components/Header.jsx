import React from "react";
import { Link } from "react-router-dom";
import '../styles/header.css'


function Header() {
    return(
        <header className="header" style={{background: '#f0f0f0', padding: '20px'}}>
            <Link to="/" className="logo">
            ZapZap ⚡
            </Link>

            <nav className="nav-buttons">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/settings" className="nav-button">Settings</Link>
            </nav>
        </header>
    )
}

export default Header;
