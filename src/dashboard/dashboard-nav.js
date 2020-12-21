import React from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './dashboard-nav.css'
import Logo from '../images/logo.png'


export default class DashboardNav extends React.Component {
    render() {
        return(
            <div className='LoginNav, group'>
                    <div className='item'>
                        
                    </div>
                    
                    <div className='item'>
                    <img src={Logo} alt="Transit Buddy"/>

                    </div>
                    <div className='item'>
                        
                        
                    </div>
            </div>
        )
        
    }
}