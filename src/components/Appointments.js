import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Appointments extends React.Component {
  state = {
    appointments: null
  }

  componentDidMount () {
    const { setPosts, user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/appointments/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          appointments: response.data
        })
        setPosts(response.data)
      })
      .catch(console.error)
  }

  render () {
    let jsx
    if (this.state.appointments === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.appointments.length === 0) {
      jsx = <p>No appointments</p>
    } else {
      jsx = (
        this.state.appointments.map(appointment => {
          return (
            <li key={appointment.id}>
              <h1>{appointment.name}</h1>
              <h1>{appointment.time}</h1>
              <h1>{appointment.kind}</h1>
            </li>
          )
        })
      )
    }

    return (
      <div>
        <h2>Appointments for </h2>
        {jsx}
      </div>
    )
  }
}

export default Appointments
