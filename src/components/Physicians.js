import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiConfig from '../apiConfig'

class Physicians extends React.Component {
  state = {
    physicians: null
  }

  componentDidMount () {
    const { setPhysician } = this.props
    axios.get(`${apiConfig}/physicians`)
      .then(response => {
        // handle success
        this.setState({
          physicians: response.data.physicians
        })
        setPhysician(response.data.physicians)
      })
      .catch(console.error)
  }

  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.physicians === null) {
      jsx = <p>Loading...</p>

    // if the API responds with no physicians
    } else if (this.state.physicians.length === 0) {
      jsx = <p>No events, please add an event</p>
    // if the API responds with events
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 physician-index">
            <ul>
              {this.state.physicians.map(physician => {
                return (
                  <li key={physician.id}>
                    <Link to={`/physicians/${physician.id}`}><h3>{physician.name}</h3></Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h2>Physicians</h2>
        {jsx}
      </div>
    )
  }
}

export default Physicians
