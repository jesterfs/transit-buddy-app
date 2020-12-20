import moment from 'moment';

export function fromApi(report) {
    
  
    delete report.date;
  
      
    return {
           ...report,
           date: moment(report.date).format('MM/DD/YYYY')
    }
 }
