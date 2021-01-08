import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './landing-body.css'
import ScreenShot from '../images/screenshot.png'
import MobileScreenShot from '../images/mobile-screenshot.png'
import { Redirect } from 'react-router-dom'
import TokenServices from '../services/token-services'

export default class LandingBody extends Component {
    render() {

        const info = TokenServices.getAuthInfo(); 
        if(info){
            return <Redirect to='/dashboard' />
        }

        return(
            <div className='landingbody'>
                <div className='landinggroup group1'>
                    <div className='item'>
                        <img src={ScreenShot} alt="TransitBuddy Dashboard" className="landing-img desktop"/>
                        <img src={MobileScreenShot} alt="TransitBuddy Dashboard" className="landing-img mobile"/>
                    </div>
                    
                    <div className='item'>
                        <h2>Riders Helping Riders</h2>
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
                        <h2>Create Your Account Today</h2>
                        <Link to='/signup'><button>Sign Up</button></Link>
                    </div>
                </div>        
            </div>     
        )       
    }
}