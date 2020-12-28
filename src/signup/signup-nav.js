import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './signup-nav.css'
import Logo from '../images/logo.png'

export default class SignUpNav extends React.Component {
    render() {
        return(
            <div className='SignUpNav, group'>
                <div className='item'>
                    <Link to='/login'>Login</Link>
                </div>
                <div className='item'>
                    <Link to='/'> <img src={Logo} alt="Transit Buddy"/> </Link>
                </div>
                <div className='item'>
                </div>
            </div>
        )
        
    }
}