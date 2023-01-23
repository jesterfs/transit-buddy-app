import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './login-body.css'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'





export default class LoginBody extends Component {

    static contextType = ApiContext;

    login(email, password) {
        return fetch(cfg.API_ENDPOINT + 'members/login', {mode:'cors'}, {
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {       
                'Content-type': 'application/json' }
        })
            .then(r => r.json())
            .then(r => {
                if(!r) {
                    console.log('No member sent')
                    return alert('Username or Password is incorrect')
                }
                //console.log(r)
                this.context.changeUser(r)
                // this.context.fetchUserData(r.member.id)
                TokenServices.saveAuthToken(r.token, r.id)
                this.props.history.push('/dashboard')
            })
        .catch(e => {
    console.log(e);
});
           
    }
    
    static contextType = ApiContext

    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { email, password } = ev.target
        console.log(email.value)
        let result = this.login(email.value, password.value)
        //console.log(result)
        //console.log(result[password])
        /*if(!result) {
            console.log('No member sent')
                return alert('Username or Password is incorrect')
        } else if (email.value !== result.email || password.value !== result.password ) {
            console.log('incorrect creds')
                return alert('Username or Password is incorrect')
        } else {
            console.log('made it to the end')
            this.context.changeUser(result)
            // this.context.fetchUserData(r.member.id)
            TokenServices.saveAuthToken(result.token, result.id)
            this.props.history.push('/dashboard')
        }*/
        //this.login(email.value, password.value)
        /*.then(r => {
            if(!r.member) {
                console.log('No member sent')
                return alert('Username or Password is incorrect')
            }
            this.context.changeUser(r.member)
            // this.context.fetchUserData(r.member.id)
            TokenServices.saveAuthToken(r.token, r.member.id)
            this.props.history.push('/dashboard')
        })*/ 
    }
    
    render() {
        return(
            <div className='LoginBody, bodygroup'>
                <div className='item title'>
                    <h1>Welcome Back!</h1>
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
