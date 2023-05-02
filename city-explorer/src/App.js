import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {
  state = {
    searchquery: '',
    location: {}
  };

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchquery}&format=json`;
    console.log(API);
    const res = await axios.get(API);
    console.log(res.data[0])
    this.setState({ location: res.data[0] });
  };

  render() {
    return (
      <>
        <input onChange={(e) => this.setState({ searchquery: e.target.value })} placeholder="search for a city"/>
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id && 
          <h2>The city is: {this.state.location.display_name}</h2>
        }
      </>
    );
  }
}

export default App;