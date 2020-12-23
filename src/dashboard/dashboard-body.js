import React from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './dashboard-body.css'
import store from '../store'
import StationBody from '../stationpage/station-body'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'
import {fromApi} from '../diplomat'
import { Fade } from 'react-awesome-reveal'
import Circle from '../images/circle.png'
import { createPortal } from 'react-dom'

export default class DashboardBody extends React.Component {

    state = {
        
        lines: [],
        selectedLine: {},
        stations: [],  
        currentStation: null,
        lineFetched: false
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
                  stations: data.stations,
                  lineFetched: true

                }, 
              ))
    };

    changeLineColor(color) {
      document.getElementsByClassName("p2").style.border = `4px solid ${color}`
    }

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
                   
                }
              ) 
              )
              
    };

    

    close = () => this.setState({currentStation: null});

    formSubmitted = e => { 
        e.preventDefault()
        if(e.currentTarget.changeLine.value == 'Select a Line'){
          return alert('Please select a line.')
        }
        const lineId = e.currentTarget.changeLine.value 
        
        
        this.changeSelectedLine(lineId)
      }

    

    addReport = (report) => {
        this.setState({reports: [...this.state.reports, report]})
    }



    componentWillMount() {
        
    }
    
    componentDidUpdate() {
      if(this.context.user && !this.state.lineFetched) {
        this.changeSelectedLine(this.context.user.line) 
          // .then(data => {
          //   this.changeLineColor(data.color)
          // }) 
      }
    }
    componentDidMount() {
      // alert('hello')
      this.fetchLines()
      
    }
    render() {
        
        const { currentStation } = this.state;
        const linecolor = {border: `4px solid ${this.state.selectedLine.color}`}
        const buttonColor = { backgroundColor: ` ${this.state.selectedLine.color}`}

        
        
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
                        <p>Hi, {this.context.user && this.context.user.name}</p>
                    </div>
                    
                    <div className='item'>
                    
                        <form onSubmit={this.formSubmitted}>
                        <label htmlFor="changeLine">Select a Different Line</label>
                        <select name="changeLine" id="changeLine">
                            <option value='Select a Line'>Select a Line</option>
                            {this.state.lines.map(line => 
                                <option value={line.id} id={line.id} key={line.id}>
                                    {line.name}
                                </option>)}
                        </select>
                        <button type='submit'>Submit</button>
                        </form>
                    
                    </div>
                    <hr></hr>
                    {/* <Fade> */}
                    <div className='stationMap'>
                        {this.state.stations.map(station =>
                            <div className='station' key={station.id}>
                              {/* <div className='circle'> <input type="image" src={Circle} className='stationbutton' onClick={() => this.setCurrentStation(station.id)} key={station.id}/> </div> */}
                                <button className='stationbutton ' onClick={() => this.setCurrentStation(station.id)} key={station.id} style={buttonColor}></button>
                                 <p className='stationName'>{station.name} </p>
                                
                                <div className='lineFrame grid-item3 '><div className='line' style={linecolor}></div></div>
                                
                            </div>
                            )}
                        
                    </div>
                    {/* </Fade> */}
            </div>
        )
        
    }
}