import './App.css';
import React from 'react';
import axios from 'axios';
import Latlon from './Latlon.js';
import Map from './Map.js';
// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      error: false,
      errorMessage: '',
      location:'',
      lat:'',
      lon:'',
      displayMap: false
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
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&=${this.state.city}&format=json`;
      // console.log(url);
      let locationIQ = await axios.get(url);
      console.log('localllllllCity', locationIQ.data[0]);
      this.setState({
        location: locationIQ.data[0].display_name,
        lat:locationIQ.data[0].lat,
        lon:locationIQ.data[0].lon,
        error:false,
        displayMap: true
      });
      console.log("onInput from STATE city data:", this.state.city,this.state.lat,this.state.lon);
    } catch (error) {
      // console.log("error", error);
      // console.log("error.message", error.message);
      this.setState({
        displayMap: false,
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
    }
  };
    render() {


      // 6. console log the added state
      // console.log("locationIQ STATE url:", this.state.locationIQ);
    




      return (
        <>

          <header>Data from location API</header>

          <form onSubmit={this.handleSubmit}>
            <label>Search City
              <input type="text" onChange={this.handleInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
          {this.state.displayMap && <Latlon city={this.state.location} lat={this.state.lat} lon={this.state.lon}/>}
          <Map   
          city={this.state.location}
          img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
          />
        </>

      );
    };
  }

export default App;
