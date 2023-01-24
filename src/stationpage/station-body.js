import React, {Component} from 'react'
import './station-body.css'
import moment from 'moment';
import cfg from '../config.js'
import TokenServices from '../services/token-services'
import ApiContext from '../ApiContext.js'


export default class StationBody extends Component {

    state = {
        reportId: null,
        reports: this.props.reports
    }

    static contextType = ApiContext;

    fetchReports = (id) => {

        console.log('made it to fetch reports')
        fetch(cfg.API_ENDPOINT + `reports/station/${id}`, {
          method: 'GET', 
          headers: {
            'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then(data => 
            this.setState({
              reports: data 
            }, 
            console.log('made it to the set state part'),
            console.log(this.state.reports)
            //console.log(this.state)
            //forceUpdate()
          ))
      };
    

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

        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

        const dateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth + " " + time;
        console.log(dateString)
        
        //console.log(dateString)
        const report = {
            name: e.currentTarget.obstacle.value, 
            date: dateString,
            station: this.props.station.id,
        }
        //console.log(report)
                
        this.addReport(report) 
            .then(data => {
                this.setState({reports: [...this.state.reports, report]}, 
                    this.fetchReports(this.props.station.id)
                    )
                
                
                alert('report added')
            })
        
      }

    convertToMoment = (date) => {
        return moment(date).format('MM/DD/YYYY')
    }

    buttonClick = e => {
        let currentStrikes = e.currentTarget.className
        e.preventDefault()
        //console.log(currentStrikes)
        
        const strikes = {
            strikes: e.currentTarget.className
        }
        //console.log(e.currentTarget.value)
        this.addStrike(e.currentTarget.value, strikes) 
            .then(report => {
                //this.setState({reports: [...this.state.reports, report]})
                //this.props.increaseReports(this.props.station.id)
                alert('Resolution reported')
            })
        e.currentTarget.setAttribute("disabled", "disabled");
        
       
    }

    addStrike(reportId, strikes) { 
        
        return fetch(cfg.API_ENDPOINT + 'reports/' + reportId + '/strike', {
            method: 'PUT', 
            body: JSON.stringify(strikes),
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
            console.log('heyyyyy')
            console.log(diffTime)
            console.log('UPDATE')
            diffTime = diffTime - 48000
            console.log(diffTime)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const toMin = (diffTime - 480000) / 60000
            const toHours = (diffTime - 480000) / (3.6e+6) 
            const hoursAgo = Math.round(toHours) - 8
            
            return 'whats up dude'

            /*
            if(toHours < 1) {
                return Math.round(toMin) + ' min(s) ago'
            } else {
                return Math.round(toHours) + ' hour(s) ago'
            }
            */
        }

        componentDidMount() {
            this.fetchReports(this.props.station.id)
        }

        
    
    render() {
        const today = new Date().getTime() / 1000
        
        const threeDays = today - (72 * 60 * 60)
        const reports = this.state.reports
        // .filter(report => report.strikes < 3  && new Date(report.date).getTime() / 1000 >= threeDays)
        //console.log(this.props.reports)
        
        return(
            <div className='popupOverlay'>
                <div className='popupBody'>
                    <h1>{this.props.station.name}</h1>
                    <button onClick= {this.props.close}>Close</button>
                    
                        <h2>Reports</h2>
                        <p className='instructions'>Is an obstacle no longer there? Report it as resolved.</p>
                            <div className='reportgrid'>
                                <div className='reportName'>Obstacle</div>
                                <div className='reportDate'>Date</div>
                                <div className='reportBtn'></div>
                            </div>
                    <ul>        
                        {reports.map(report => 
                            <li className='reportgrid' value={report.id} id={report.id} key={report.id}>
                                <div className='reportName'>{report.name}</div> 
                                <div className='reportDate'>{this.daysAgo(report.date)}</div>  
                                <div className='reportBtn'><button ref={`btn${report.id}`}  value={report.id} className={report.strikes + 1} onClick={this.buttonClick}>Resolved</button></div>
                            </li>)}
                    </ul>
                    <form onSubmit={this.formSubmitted}>
                        <h2>Make a Report</h2>
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
