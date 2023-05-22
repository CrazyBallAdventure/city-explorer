import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import './App.css'

class App extends Component {
  state = {
    searchquery: '',
    location: { lat: null, lon: null, display_name: null },
    mapUrl: '',
    forecastData: false,
    displayWeather: [],
    error: false
  };

  getLocation = async () => {

    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchquery}&format=json`;
    try {
      const response = await axios.get(API)
      const { lat, lon, display_name } = response.data[0];
      const mapAPI = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${lat},${lon}&zoom=13`;
      console.log(mapAPI)
      this.setState({ mapUrl: mapAPI });
      this.setState({ location: { lat, lon, display_name } });
    } catch (error) {
      console.log(error.message)
      this.setState({ error: true })
    }

  };

setforcastData = (weather) => {
  this.setState({forecastData: weather})
}

setdisplayWeather = (weather2) => {
  this.setState({displayWeather: weather2})
}

  getForecast = async (lat, lon) => {
    lat = (Math.round(lat * 100) / 100).toFixed(2);
    lon = (Math.round(lon * 100) / 100).toFixed(2);
     const weatherAPI = `http://localhost:3001/weather?lat=${lat}&lon=${lon}`;
    try {
      const res = await axios.get(weatherAPI);
      console.log(res.data);
      this.setforcastData(res.data);
      this.setdisplayWeather(true);
      // this.setState({ forecastData });
    } catch (error) {
      console.log(error.message)
      this.setState({ error: true })
    }
  }

  render() {
    let errorMessage = ""

    if (this.state.error === true) {
      errorMessage = "ERROR Message"
    } else {
      errorMessage = ""
    }


    return (
      <div className="explorer-container mt-5">
        <Form>
          <Form.Group as={Row} controlId="formSearch">
            <Form.Label column sm={2}>
              Where are you trying to go?
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter a city"
                value={this.state.searchquery}
                onChange={(e) => this.setState({ searchquery: e.target.value })}
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" onClick={this.getLocation}>
                Vamonos!
              </Button>
            </Col>
          </Form.Group>
        </Form>
        {errorMessage}


        {this.state.location.lat !== null && this.state.location.lon !== null && (
          <div className="mt-3">
            <h3>You have arrived at {this.state.location.display_name}!</h3>
            <Row>
              <Col>
                <h4>Latitude:</h4>
                <p>{this.state.location.lat}</p>
              </Col>
              <Col>
                <h4>Longitude:</h4>
                <p>{this.state.location.lon}</p>
              </Col>
            </Row>
          </div>
        )}

        {this.state.mapUrl !== '' && (
          <div className="mt-3">
            <img src={this.state.mapUrl} alt="Map of city" />
          </div>
        )}


      </div>
    );
  }
}
// grrrrr grrrrrrrrrrr
export default App;