/* eslint-disable import/no-anonymous-default-export */
import '../template/Logo.css'
import logo from '../../assets/images/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

//componente funcional

export default props => 
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>   
    </aside>