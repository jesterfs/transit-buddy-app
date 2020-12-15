import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './login-body.css'
import ApiContext from '../ApiContext.js'






export default class LoginBody extends Component {

    static contextType = ApiContext;

    formSubmitted = e => { 
        e.preventDefault()
        let email = e.currentTarget.email.value
        let password = e.currentTarget.password.value
        let user = this.context.members.find(member => member.email == email && member.password == password)
        if (!user) {
            return alert('Incorrect email or password')
        }
        this.context.changeUser(user.id)
        this.props.history.push('/dashboard')
      }
    
    render() {
        return(
            <div className='LoginBody, bodygroup'>
                    <div className='item'>
                        <h2>Welcome Back!</h2>
                    </div>
                    
                    <div className='item'>
                        <form className='login-form' onSubmit={this.formSubmitted} >
                            
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