import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './landing-body.css'
import ScreenShot from '../images/screenshot.png'

export default class LandingBody extends Component {
    render() {
        return(
            <div className='landingbody'>
                <div className='landinggroup group1'>
                    <div className='item'>
                        <img src={ScreenShot} alt="TransitBuddy Dashboard" className="landing-img"/>
                    </div>
                    
                    <div className='item'>
                        <h3>Riders Helping Riders</h3>
                        <p>
                            Navigating complicated public transit systems is hard enough without dealing with construction, 
                            out of service elevators, and other obstacles that get in your way. With Transit Buddy, you can make
                            your commute easier and help out your fellow riders along the way. We let you report issues along
                            your route and see what problems other passengers have run into. 
                        </p>
                    </div>
                </div>
                <div className='landinggroup2'>
                    <div className='item'>
                        <h3>Create Your Account Today</h3>
                        <Link to='/signup'><button>Sign Up</button></Link>
                    </div>
                </div>        
            </div>     
        )       
    }
}