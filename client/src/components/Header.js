import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
        <header className="border-[#6B4E45] border-b mb-14 pt-2">
        <nav className="flex flex-row-reverse" aria-label="Global">
            <Link to="/">
                <img src={logo} alt='Isnad Logo'/>
            </Link>
        </nav>
        </header>
  )
}

export default Header