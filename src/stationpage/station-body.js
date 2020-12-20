import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
// import store from '../store.js'
import './station-body.css'
import moment from 'moment';
import {fromApi} from '../diplomat'
import cfg from '../config.js'
import TokenServices from '../services/token-services'





export default class StationBody extends Component {

    state = {
        reportId: null,
        reports: this.props.reports
    }

    // updateStrikesOnApi(strikes) { 
    //     return fetch(cfg.API_ENDPOINT + 'reports/' + this.state.reportId, {
    //         method: 'PATCH', 
    //         body: JSON.stringify(strikes),
    //         headers: { 
    //             'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
    //             'Content-type': 'application/json' }
    //     })
    //         .then(r => r.json())
    
    // }

    addReport(report) {
        return fetch(cfg.API_ENDPOINT + 'reports/', {
            method: 'POST', 
            body: JSON.stringify(report),
            headers: { 
                'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
                'Content-type': 'application/json' }
        })
            .then(r => r.json())
    }
    
    formSubmitted = e => { 
        e.preventDefault()
        let date = new Date()
        const report = {
            name: e.currentTarget.obstacle.value, 
            date: date,
            station: this.props.station.id,
        }
        this.addReport(report) 
            .then(report => {
                this.setState({reports: [...this.state.reports, report]})
                alert('report added')
            })
        
      }

    convertToMoment = (date) => {
        return moment(date).format('MM/DD/YYYY')
    }

    buttonClick = e => {
        let currentStrikes = e.currentTarget.className
        let reportId = e.currentTarget.value
        // this.setState({reportId: reportId})
        e.currentTarget.setAttribute("disabled", "disabled");
        // console.log(reportId)
        this.addStrike(reportId, currentStrikes)
    }

    addStrike(reportId, strikes) {
        
        // this.setState({strikeCount: currentStrikes+1})
        // this.setState({reportId: e.currentTarget.value})
        
        
        let newStrikes = {
            strikes: strikes
        }
        console.log(reportId)

        return fetch(cfg.API_ENDPOINT + 'reports/' + reportId, {
            method: 'PATCH', 
            body: JSON.stringify(newStrikes),
            headers: { 
                'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
                'Content-type': 'application/json' }
        })
            .then(r => r.json())
            .then(alert('Report Updated'))

    }  


        daysAgo(date) {
            const date1 = new Date();
            const date2 = new Date(date);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const toMin = (diffTime) / 60000
            const toHours = (diffTime) / (3.6e+6)

            if(toHours < 1) {
                return Math.round(toMin) + ' min(s) ago'
            } else {
                return Math.round(toHours) + ' hour(s) ago'
            }
            
        }

        
    
    render() {
        const today = new Date().getTime() / 1000
        const threeDays = today - (72 * 60 * 60)
        const fourDays = today - (96 * 60 * 60)
        const reports = this.state.reports.filter(report => report.strikes < 3  && new Date(report.date).getTime() / 1000 >= threeDays)
        
        // console.log(this.daysAgo(fourDays))


        
        return(
            <div className='popupOverlay'>
                   <div className='popupBody'>
                        <h2>{this.props.station.name}</h2>
                        <button onClick= {this.props.close}>Close</button>
                        <ul>
                            <h3>Obstacles</h3>

                            {reports.map(report => 
                                <li className={report.id} value={report.id} id={report.id} key={report.id}>
                                    {report.name} - {this.daysAgo(report.date)
                                    //  this.convertToMoment(report.date)
                                    } - 
                                    <button ref={`btn${report.id}`}  value={report.id} className={report.strikes + 1} onClick={this.buttonClick}>Resolved</button>
                                </li>)}
                        </ul>
                        <form onSubmit={this.formSubmitted}>
                            <h3>Make a Report</h3>
                            <div>
                                <label htmlFor="obstacle">Obstacle:</label>
                                <select name="obstacle" id="obstacle">
                                    <option value='Construction'>
                                        Construction
                                    </option>
                                    <option value='Broken Escalator'>
                                        Broken Escalator
                                    </option>
                                    <option value='Broken Elevator'>
                                        Broken Elevator
                                    </option>
                                    <option value='Fare Checkpoint'>
                                        Fare Checkpoint
                                    </option>
                                    <option value='Police'>
                                        Police 
                                    </option>
                                    <option value='Broken Fare Machine'>
                                        Broken Fare Machine 
                                    </option>
                                </select>
                            </div>

                            <button className='reportSub' type='submit'>submit</button>
                        </form>

                        
                   </div>                   
            </div>
        )
        
    }
}