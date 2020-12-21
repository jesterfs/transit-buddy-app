import React from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './dashboard-body.css'
import store from '../store'
import StationBody from '../stationpage/station-body'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'
import {fromApi} from '../diplomat'

export default class DashboardBody extends React.Component {

    state = {
        user: this.context.user,
        lines: [],
        selectedLine: {},
        stations: [],  
        currentStation: null,
        reports: store.reports
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
    

    changeSelectedLine = (id) => {
        fetch(cfg.API_ENDPOINT + `lines/${id}`, {
            method: 'GET', 
            headers: {
              'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
              'Content-Type': 'application/json',
            }
          })
              .then(response => response.json())
              .then(data => 
                this.setState({
                  selectedLine: data,
                  stations: data.stations  
                }, 
              ))
    };

    setCurrentStation = (id) => {
        fetch(cfg.API_ENDPOINT + `stations/${id}`, {
            method: 'GET', 
            headers: {
              'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
              'Content-Type': 'application/json',
            }
          })
              .then(response => response.json())
              .then(data => 
                this.setState({
                  currentStation: data
                   
                }, 
              ))
    };

    

    close = () => this.setState({currentStation: null});

    formSubmitted = e => { 
        e.preventDefault()
        const lineId = e.currentTarget.changeLine.value 
        
        
        this.changeSelectedLine(lineId)
      }

    

    addReport = (report) => {
        this.setState({reports: [...this.state.reports, report]})
    }



    componentWillMount() {
        this.fetchLines()
        this.changeSelectedLine(this.state.user.line)
    }
    

    componentDidMount() {
        // this.changeSelectedLine(this.state.user.line)
    }
    render() {
        
        const { currentStation } = this.state;
        

        
        
        return(
            <div className='dashboardgroup'>
                {!!currentStation && <StationBody 
                    station={currentStation} 
                    reports={currentStation.reports} 
                    close = {this.close}
                    addReport = {this.addReport}
                    addStrike = {this.addStrike}
                    />}
                    <div className='item'>
                        <h2>{this.state.selectedLine.name}</h2>
                        <p>Hi, {this.state.user.name}</p>
                    </div>
                    
                    <div className='item'>
                    
                        <form onSubmit={this.formSubmitted}>
                        <label htmlFor="changeLine">Select a Different Line</label>
                        <select name="changeLine" id="changeLine">
                            <option>Select a Line</option>
                            {this.state.lines.map(line => 
                                <option value={line.id} id={line.id} key={line.id}>
                                    {line.name}
                                </option>)}
                        </select>
                        <button type='submit'>Submit</button>
                        </form>
                    
                    </div>
                    <hr></hr>
                    <div className='stationMap'>
                        {this.state.stations.map(station =>
                            <div className='item2' key={station.id}>
                                <button className='stationbutton ' onClick={() => this.setCurrentStation(station.id)} key={station.id}>{station.name}</button>
                                  
                                <br></br>
                                <div className='line'></div>
                            </div>
                            )}
                        
                    </div>
            </div>
        )
        
    }
}