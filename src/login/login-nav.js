import React from 'react'
import { Link } from 'react-router-dom'
import './login-nav.css'

export default class LoginNav extends React.Component {
    render() {
        return(
            <div className='LoginNav, group'>
                    <div className='item'>
                        
                    </div>
                    
                    <div className='item'>
                        <h1>Transit Buddy</h1>
                    </div>
                    <div className='item'>
                        <Link to='/signup'> <button>Sign Up</button> </Link>
                        
                    </div>
            </div>
        )
        
    }
}