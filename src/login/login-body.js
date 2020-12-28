import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './login-body.css'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'





export default class LoginBody extends Component {

    static contextType = ApiContext;

    login(email, password) {
        return fetch(cfg.API_ENDPOINT + 'members/login', {
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {       
                'Content-type': 'application/json' }
        })
            .then(r => r.json())
    }
    
    static contextType = ApiContext

    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { email, password } = ev.target
        this.login(email.value, password.value)
        .then(r => {
            if(!r.member) {
                return alert('Username or Password is incorrect')
            }
            this.context.changeUser(r.member)
            // this.context.fetchUserData(r.member.id)
            TokenServices.saveAuthToken(r.token, r.member.id)
            this.props.history.push('/dashboard')
        }) 
    }
    
    render() {
        return(
            <div className='LoginBody, bodygroup'>
                <div className='item title'>
                    <h2>Welcome Back!</h2>
                </div>
                
                <div className='item'>
                    <form className='login-form' onSubmit={this.handleSubmitBasicAuth} >
                        
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' />
                        </div>

                        <button type='submit'>Login</button>
                    </form>
                </div>  
            </div>
        )    
    }
}