import React from 'react'
import * as moment from 'moment'
import './css/Time.css'
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: moment() }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ time: moment() })
        }, 1000);
    }

    render() {
        return (
            <div className='time'>
                Today is the: <br /><span className='timer'>{this.state.time.format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
        )
    }
}

export default Time