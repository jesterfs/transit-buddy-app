import React from 'react'
import {  Link } from 'react-router-dom'
import './landing-nav.css'
import Logo from '../images/logo.png'

export default class LandingNav extends React.Component {
    render() {
        return(
            <div className='LandingNav, group'>
                    <div  className='item navbtn'>
                        <Link to='/login'>Log In</Link>
                        
                    </div>
                    
                    <div className='item'>
                        <img src={Logo} alt="Transit Buddy"/>
                    </div>
                    
                    <div id='signupbtn' className='item'>
                        <Link to='/signup'>Sign Up</Link>
                        
                    </div>
            </div>
        )
        
    }
}