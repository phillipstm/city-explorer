import './App.css';
import React from 'react';
import axios from 'axios';
import Latlon from './Latlon.js';
import Map from './Map.js';
import { Button } from 'react-bootstrap';
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      error: false,
      errorMessage: '',
      location: '',
      lat: '',
      lon: '',
      displayMap: false,
      weather: []
    };
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  }

  // handleSubmit = (event) =>
  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("SubmitEvent:", event);
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
      console.log(url);
      let locationIQ = await axios.get(url);
      console.log(locationIQ);
      let lat = locationIQ.data[0].lat;
      let lon = locationIQ.data[0].lon;
      console.log('localllllllCity', locationIQ.data[0]);
      this.setState({
        location: locationIQ.data[0].display_name,
        lat: locationIQ.data[0].lat,
        lon: locationIQ.data[0].lon,
        error: false,
        displayMap: true
      });
      this.displayWeather(lat, lon);
    } catch (error) {
      console.log("Error", error.message);
      this.setState({
        displayMap: false,
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
    }
  };



  displayWeather = async (lat, lon) => {
    // console.log("lat and lon:", lat, lon);
    try {
      const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`,
        {
          params: {
            lat: lat,
            lon: lon,
            query: this.state.city,
          },
        });
      console.log("weather from server", weather);
      this.setState({ weather: weather.data, });
    } catch (error) {
      this.setState({
        displayMap: false,
        displayError: true,
        errorMessage: `Awe Snap there was an error: ${error.response.status}`,
      });
    }
  };
  render() {


    // 6. console log the added state
    // console.log("locationIQ STATE url:", this.state.locationIQ);

    console.log('kjhgkhgffgdxgffghjkh',this.state.weather);




    return (
      <>

        <header>Where would you like to search?</header>

        <form onSubmit={this.handleSubmit}>
          <label>Search City
            <input type="text" onChange={this.handleInput} />
          </label>
          <Button varint="success" type="submit">Explore!</Button>
        </form>
        {this.state.displayMap && <Latlon city={this.state.location} lat={this.state.lat} lon={this.state.lon} />}
        <Map
          city={this.state.location}
          img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13&size=$1000x1000`}
        />
         <Weather weather={this.state.weather} />
      </>

    );
  };
}

export default App;
