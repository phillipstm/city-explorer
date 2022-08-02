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

    render() {

      console.log("SubmitEvent:", event);
      let locationIQ = await axios.get(`https://us1.locationiq.com/v1/search.php`);

      // 6. console log the added state
      console.log("locationIQ STATE:", this.state.locationIQ);
      console.log("onInput in STATE:", this.state.city);



    // let locationIQ = this.state.locationData.map((locationIQ, index) => {
    //   return <li key={index}>{locationIQ.name}</li>;

  <>
  return (
  <header>Data from location API</header></>

<form onSubmit={this.handleSubmit}>
<button type="submit">Explore!</button>
</form>
    </>

  );
    };
  }

export default App;
