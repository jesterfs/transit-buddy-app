import React, {Component} from 'react'
import './signup-body.css'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'



export default class SignUpBody extends Component {
    
    state = {
        lines: [],
        endpoint: console.log(cfg.API_ENDPOINT + `lines/`)
    };

    static contextType = ApiContext;

    

    fetchLines = () => {
        //console.log(cfg.API_ENDPOINT + `lines/`);
        fetch(cfg.API_ENDPOINT + `lines/`, {
            method: 'GET', 
            mode: 'cors',
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
            .catch((e) =>  {         
                alert(`Couldn't add member, sorry`)    
            }) 
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
            .then(data => 
                //console.log(member)
                this.login(member.email, member.password)     
                )
            .catch((e) =>  {         
                alert(`Couldn't add member, sorry`)    
            }) 
    }

    addMember(member, token) {
        //this.context.changeUser(member)
        TokenServices.saveAuthToken(token)
        this.login(member.email, member.password)      
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

    login(email, password) {
        return fetch(cfg.API_ENDPOINT + 'members/login', {
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
                console.log(r)
                this.context.changeUser(r)
                // this.context.fetchUserData(r.member.id)
                TokenServices.saveAuthToken(r.token, r.id)
                this.props.history.push('/dashboard')
            })
           
    }

    
    componentDidMount() {
        
        this.fetchLines()
    }
    
    render() {
        
        return(
            <div className='SignUpBody, bodygroup'>
                <div className='item'>
                    <h1>Sign Up</h1>
        
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