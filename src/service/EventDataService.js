import axios from 'axios'

const INSTRUCTOR = 'u'
const PASSWORD = 'p'
const EVENT_API_URL = 'http://localhost:8080'
const LOGIN_API_URL = `${EVENT_API_URL}/authenticate`

class EventDataService {

    retrieveAllCourses(name) {
        //console.log('executed service')
        return axios.get(`${LOGIN_API_URL}`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }
}
export default EventDataService