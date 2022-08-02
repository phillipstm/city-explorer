import React from 'react';
import { Image } from 'react-bootstrap';

class Map extends React.Component {
    render() {
        return (
            <div>
                <Image src={this.props.img_url} alt={this.props.city} title={this.props.city} rounded fluid />
            </div>
        );
    }
}

export default Map;