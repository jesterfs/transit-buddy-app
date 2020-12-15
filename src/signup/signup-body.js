import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './signup-body.css'
import store from '../store.js'
import ApiContext from '../ApiContext.js'



export default class SignUpBody extends Component {
    
    state = {
        lines: store.lines
    };

    static contextType = ApiContext;

    formSubmitted = e => { 
        e.preventDefault()
        const id = this.context.members.length + 1
        let user = {
            id, 
            name: e.currentTarget.signupName.value,
            email: e.currentTarget.signupEmail.value,
            password: e.currentTarget.signupPassword.value,
            line: e.currentTarget.defaultLine.value,
        }
        this.context.signup(user)
        this.props.history.push('/dashboard')
      }

    
    
    
    render() {
        return(
            <div className='SignUpBody, bodygroup'>
                    <div className='item'>
                        <h2>Create Your Transit Buddy Account</h2>
                    </div>
                    
                    <div className='item'>
                        <form class='signup-form' onSubmit={this.formSubmitted}>
                
                            <div>
                                <label htmlFor="signupName">Full Name</label>
                                <input type="text" name='signupName' id='signupName' placeholder='Full Name' />
                            </div>

                            <div>
                                <label htmlFor="signupEmail">Email</label>
                                <input type="text" name='signupEmail' id='signupEmail' />
                            </div>
                            <div>
                                <label htmlFor="defaultLine">Default Transit Line</label>
                                <select name="defaultLine" id="defaultLine">
                                    {this.state.lines.map(line => 
                                        <option value={line.id} id={line.id} key={line.id}>
                                            {line.name}
                                        </option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="signupPassword">Password</label>
                                <input type="password" name='signupPassword' id='signupPassword' />
                            </div>

                            <button type='submit'>Sign Up</button>
                        </form>
                    </div>
                    
            </div>
        )
        
    }
}