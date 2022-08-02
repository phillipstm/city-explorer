import './App.css';
import React from 'react';
import axios from 'axios';
// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      // latitude: [],
      // longitude: [],
      locationIQ: [],
      cityData: {},
      error: false,
      errorMessage: "",
    };
  }


  // handleSubmit = (event) =>
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SubmitEvent:", event);
    // https://us1.locationiq.com/v1/search?key=<Your_API_Access_Token>&q=221b%2C%20Baker%20St%2C%20London%20&format=json
    let locationIQ = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}`);
    console.log(locationIQ)
  }


    render() {


      // 6. console log the added state
      console.log("locationIQ STATE:", this.state.locationIQ);
      console.log("onInput in STATE:", this.state.city);



      // let locationIQ = this.state.locationData.map((locationIQ, index) => {
      //   return <li key={index}>{locationIQ.name}</li>;

        return (
          <>

        <header>Data from location API</header>

        <form onSubmit={this.handleSubmit}>
          <label>Search City
            <input type="text" onChange={this.handleInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>
      </>

  );
    };
  }

export default App;
