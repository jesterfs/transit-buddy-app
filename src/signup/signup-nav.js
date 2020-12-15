import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './signup-nav.css'

export default class SignUpNav extends React.Component {
    render() {
        return(
            <div className='SignUpNav, group'>
                    <div className='item'>
                        
                    </div>
                    
                    <div className='item'>
                        <h1>Transit Buddy</h1>
                    </div>
                    <div className='item'>
                    <Link to='/login'><button>Login</button></Link>
                        
                    </div>
            </div>
        )
        
    }
}