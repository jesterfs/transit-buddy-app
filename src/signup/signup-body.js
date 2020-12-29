import React, {Component} from 'react'
import './signup-body.css'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'



export default class SignUpBody extends Component {
    
    state = {
        lines: []
    };

    static contextType = ApiContext;

    fetchLines = () => {
        fetch(cfg.API_ENDPOINT + `lines/`, {
            method: 'GET', 
            headers: {
              'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
              'Content-Type': 'application/json',
            }
          })
            .then(response => response.json())
            .then(data => 
                this.setState({
                    lines: data 
                }, 
            ))
    };

    addMemberToApi(member) {
        return fetch(cfg.API_ENDPOINT + 'members/signup', {
            method: 'POST', 
            body: JSON.stringify(member),
            headers: { 
                'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
                'Content-type': 'application/json' }
        })
    
            .then(r => r.json())
            .then(data => this.addMember(data.member, data.token))
            .catch((e) =>  {         
                alert(`Couldn't add member, sorry`)    
            }) 
    }

    addMember(member, token) {
        this.context.changeUser(member)
        TokenServices.saveAuthToken(token)
        this.props.history.push(`/dashboard`)       
    }

    formSubmitted = e => { 
        e.preventDefault()
        if(e.currentTarget.signupPassword.value.length < 8) {
            return alert('Password must be atleast 8 characters')
        }
        const member = {
            name: e.currentTarget.signupName.value ,
            email: e.currentTarget.signupEmail.value,
            password: e.currentTarget.signupPassword.value,
            line: e.currentTarget.defaultLine.value
        }
        this.addMemberToApi(member)
    }

    
    componentDidMount() {
        this.fetchLines()
    }
    
    render() {
        return(
            <div className='SignUpBody, bodygroup'>
                <div className='item'>
                    <h2>Sign Up</h2>
                </div>
                
                <div className='item'>
                    <form className='signup-form' onSubmit={this.formSubmitted}>
            
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