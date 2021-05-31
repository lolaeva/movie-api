import React from 'react'
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <img src="/movie.png" alt=""></img>
        </Link>
      </div>
      <div><Link to="/about">About</Link></div>
    </header>
  )
}

export default Header