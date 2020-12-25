import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
// import store from '../store.js'
import './station-body.css'
import moment from 'moment';
import {fromApi} from '../diplomat'
import cfg from '../config.js'
import TokenServices from '../services/token-services'
import ApiContext from '../ApiContext.js'





export default class StationBody extends Component {

    state = {
        reportId: null,
        reports: this.props.reports
    }

    static contextType = ApiContext;

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
        if(e.currentTarget.obstacle.value == 'Select an Obstacle'){
            return alert('Select an Obstacle First')
        }
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
        
        this.addStrike(reportId)
    }

    addStrike(reportId) { 
        
        return fetch(cfg.API_ENDPOINT + 'reports/' + reportId + '/strike', {
            method: 'POST', 
            
            headers: { 
                'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
                'Content-type': 'application/json' }
        })
            .then(r => r.json())
            .then(alert('Resolution Submitted!'))

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
        
       


        
        return(
            <div className='popupOverlay'>
                   <div className='popupBody'>
                        <h2>{this.props.station.name}</h2>
                        <button onClick= {this.props.close}>Close</button>
                        <ul>
                            <h3>Obstacles</h3>
                                <div className='reportgrid'>
                                    <div className='reportName'>Report</div>
                                    <div className='reportDate'>Date</div>
                                    <div className='reportBtn'></div>
                                </div>
                            {reports.map(report => 
                                <li className='reportgrid' value={report.id} id={report.id} key={report.id}>
                                    <div className='reportName'>{report.name}</div> 
                                    <div className='reportDate'>{this.daysAgo(report.date)}</div>  
                                    <div className='reportBtn'><button ref={`btn${report.id}`}  value={report.id} className={report.strikes + 1} onClick={this.buttonClick}>Resolved</button></div>
                                </li>)}
                        </ul>
                        <form onSubmit={this.formSubmitted}>
                            <h3>Make a Report</h3>
                            <div>
                                <label htmlFor="obstacle">Obstacle:</label>
                                <select name="obstacle" id="obstacle">
                                    <option value='Select an Obstacle'>
                                        Select an Obstacle
                                    </option>
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