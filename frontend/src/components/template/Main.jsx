/* eslint-disable import/no-anonymous-default-export */
import './Main.css'
import React from 'react'
import './Header'
import Header from './Header'

//stateless component
export default props =>
    <React.Fragment>
        <Header {...props}/> 
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>