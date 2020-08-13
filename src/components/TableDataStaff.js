import React from 'react';
import * as Constants from "../common/CommonUtils";
import Staff from "./Staff";

class TableDataStaff extends React.Component  {

	constructor(props) {
        super(props);
        this.state = {
            listStaff: []
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };

        fetch(Constants.SERVER + "/staff/getAllStaff", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    listStaff: data
                })
            ).catch(console.log);

    }

	render() {
		let elements = this.state.listStaff.map((staff, index)=>{

    			return <Staff
    						key = { index }
    						name = { staff.name }
    						address = { staff.address }
    						gender = { staff.gender }
    						email = { staff.email }
    			/>
    		});
    	return(
    		<tbody>
    			{ elements }
    		</tbody>
    	);
    }
    	
}




export default TableDataStaff;