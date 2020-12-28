import React from 'react'
import { Link } from 'react-router-dom'
import './login-nav.css'
import Logo from '../images/logo.png'

export default class LoginNav extends React.Component {
    render() {
        return(
            <div className='LoginNav, group'>
                    <div className='item'>
                        <Link to='/signup'>Sign Up</Link>
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