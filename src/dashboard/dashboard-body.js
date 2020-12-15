import React from 'react'
// import { NavLink, Link } from 'react-router-dom'
import './dashboard-body.css'
import store from '../store'
import StationBody from '../stationpage/station-body'
import ApiContext from '../ApiContext.js'
// import moment from 'moment';

export default class DashboardBody extends React.Component {

    state = {
        lines: store.lines,
        selectedLine: store.lines[0],
        // stations: store.stations.filter(station => station.line === this.state.selectedLine.id),  
        currentStation: null,
        reports: store.reports
    };

    static contextType = ApiContext;

    setCurrentStation = (currentStation) => this.setState({ currentStation });

    close = () => this.setCurrentStation(null);

    formSubmitted = e => { 
        e.preventDefault()
        const lineId = e.currentTarget.changeLine.value 
        const newLine = this.state.lines.find(line => line.id == lineId)
        
        this.setState({selectedLine: newLine})
      }

    

    addReport = (report) => {
        this.setState({reports: [...this.state.reports, report]})
    }

    // addStrike = (reportId) => {
    //     // this.setState({reports: this.state.reports.filter(report => report.id != reportId)})
    //     let report = this.state.reports.find(report => report.id == reportId)
    //     let updatedReport = {
    //         id: reportId,
    //         name: report.name, 
    //         date: report.date,
    //         station: report.station,
    //         strikes: report.strikes + 1
    //     }
    //     console.log(report)
    //     console.log(updatedReport)
        
    // }

    

    componentDidMount() {
        // this.setState({stations: store.stations.filter(station => station.line === selectedLine.id)})
    }
    render() {
        const stations = store.stations.filter(station => station.line === this.state.selectedLine.id)  
        const { currentStation } = this.state;
        const color = `color:${this.state.selectedLine.color};`
        
        return(
            <div className='dashboardgroup'>
                {!!currentStation && <StationBody 
                    station={currentStation} 
                    reports={this.state.reports} 
                    close = {this.close}
                    addReport = {this.addReport}
                    addStrike = {this.addStrike}
                    />}
                    <div className='item'>
                        <h2>{this.state.selectedLine.name}</h2>
                        <p>Hi, {this.context.user.name}</p>
                    </div>
                    
                    <div className='item'>
                    
                        <form onSubmit={this.formSubmitted}>
                        <label htmlFor="changeLine">Select a Different Line</label>
                        <select name="changeLine" id="changeLine">
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
                        {stations.map(station =>
                            <div className='item2'>
                                <button className='stationbutton ' onClick={() => this.setCurrentStation(station)} key={station.id}>{station.name}</button>
                                <br></br>
                                <div className='line'></div>
                            </div>
                            )}
                        
                    </div>
            </div>
        )
        
    }
}