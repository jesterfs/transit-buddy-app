import React from 'react'
import './dashboard-body.css'
import StationBody from '../stationpage/station-body'
import ApiContext from '../ApiContext.js'
import cfg from '../config.js'
import TokenServices from '../services/token-services'
import { Redirect } from 'react-router-dom'

export default class DashboardBody extends React.Component {

  state = {
      lines: [],
      selectedLine: {},
      stations: [],  
      currentStation: null,
      lineFetched: false
  };

  static contextType = ApiContext;

  increaseReports = (stationId) => {
    const { stations } = this.state;
    const stationIndex = stations.findIndex(s => s.id == stationId)
    const station = {...stations[stationIndex]}
    const newStations = [...stations]
    station.reports++
    newStations[stationIndex] = station
    this.setState({stations: newStations})
  }

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
      .then(data => {
        this.setState({
          currentStation: data
            
        }) 
        window.scrollTo(0,0)
      })
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

  logOut = e => {
    e.preventDefault()
    this.context.logOut()
    this.props.history.push('/')
  }


  checkReports = (reportCount) => {
    if(reportCount > 0) {
      return {fontWeight: 'bolder' , fontStyle: 'italic'}
    } else {
      return {fontWeight: 'normal'}
    }
  }

  
  componentDidUpdate() {
    if(this.context.user && !this.state.lineFetched) {
      this.changeSelectedLine(this.context.user.line) 
    }
  }

  componentDidMount() {
    this.fetchLines()
    
  }

  render() {
    const info = TokenServices.getAuthInfo(); 
      if(!info){
        return <Redirect to='/login' />
      }

      const { currentStation } = this.state;
      const linecolor = {border: `4px solid ${this.state.selectedLine.color}`, backgroundColor: this.state.selectedLine.color}
      const buttonColor = { backgroundColor: ` ${this.state.selectedLine.color}`}
      
    

      return(
        <div className='dashboardgroup'>
          
          {!!currentStation && <StationBody 
              station={currentStation} 
              reports={currentStation.reports} 
              close = {this.close}
              increaseReports = {this.increaseReports}
              addStrike = {this.addStrike}
              />}
          
            <div className='item'>
                <h1>{this.state.selectedLine.name}</h1>
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
            <p className='instructions'>If a station name is bold, there's an active report.</p>
            <div className='stationMap'>
              
              {this.state.stations.map(station =>
                  <div className='station' key={station.id}>
                      <button title={station.name} className='stationbutton ' onClick={() => this.setCurrentStation(station.id)} key={station.id} style={buttonColor}></button>
                        <p className='stationName' style={this.checkReports(station.reports)}>{station.name} </p>
                      
                      <div className='lineFrame grid-item3 '><div className='line' style={linecolor}></div></div>
                      
                  </div>
                  )}
                
            </div>
            <button onClick={this.logOut}>Log Out</button>
        </div>
      )
      
  }
}