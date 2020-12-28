import React from 'react'
import {  Link } from 'react-router-dom'
import './dashboard-nav.css'
import Logo from '../images/logo.png'


export default class DashboardNav extends React.Component {
    render() {
        return(
            <div className='LoginNav, group'>
                <div className='item'> 
                </div>
                
                <div className='item'>
                <Link to='/dashboard'> <img src={Logo} alt="Transit Buddy"/> </Link>

                </div>
                <div className='item'>  
                </div>
            </div>
        )
        
    }
}