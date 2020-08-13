import React from 'react';

class Staff extends React.Component  {
	constructor(props) {
        super(props);
    }

    render(){
    	return(
    		<tr>
    			<td>{this.props.name}</td>
    			<td>{this.props.address}</td>
    			<td>{this.props.gender}</td>
    			<td>{this.props.email}</td>
    		</tr>
    		);
    }
}

export default Staff;