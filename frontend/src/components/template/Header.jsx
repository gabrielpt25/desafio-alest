/* eslint-disable import/no-anonymous-default-export */
import './Header.css'
import React from 'react'

//componente funcional
export default props =>
    <header className="header d-nome d-sm-flex">
        <h1 className="mt3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
    </header>