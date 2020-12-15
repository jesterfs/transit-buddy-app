import React, {Component} from 'react'
// import { NavLink, Link } from 'react-router-dom'
// import store from '../store.js'
import './station-body.css'
// import moment from 'moment';



export default class StationBody extends Component {
    
    formSubmitted = e => { 
        e.preventDefault()
        let date = new Date()
        const report = {
            id: this.props.reports.length + 1,
            name: e.currentTarget.obstacle.value, 
            date: date.toDateString(),
            station: this.props.station.id,
            strikes: 0
        }
        
        this.props.addReport(report)
      }

    // addStrike = e => {
    //     let reportId = e.currentTarget.obstacle.value
    //     this.props.addStrike(reportId)
    // }  
    
    render() {
        const reports = this.props.reports.filter(report => report.station === this.props.station.id)
        return(
            <div className='popupOverlay'>
                   <div className='popupBody'>
                        <h2>{this.props.station.name}</h2>
                        <button onClick= {this.props.close}>Close</button>
                        <ul>
                            <h3>Obstacles</h3>
                            {reports.map(report => 
                                <li className={report.id} value={report.id} id={report.id} key={report.id}>
                                    {report.name} - {report.date}
                                    <button>Not There</button>
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
                                    <option value='Fair Checkpoint'>
                                        Fair Checkpoint
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