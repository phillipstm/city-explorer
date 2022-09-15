import React from 'react';

class Weather extends React.Component {

    render() {
        console.log(this.props.weather)
        return(
        <>
            <h3>Weather: </h3>
            {
            this.props.weather.map((day, index) => (
              
              <>
                <h3>{day.temp} : {day.time} : {day.forecast}</h3>
               
                </>
            ))
            }
        </>
        )
    }
}

export default Weather;