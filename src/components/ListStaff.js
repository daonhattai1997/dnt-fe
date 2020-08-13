import React from 'react';
import TableDataStaff from "./TableDataStaff";

class ListStaff extends React.Component  {
	render () {
    	return(
			<div>
				<h2>Danh sách nhân viên</h2>
				<table className="table table-striped" id="tableContent" style={{marginTop:10}}>
                        <thead>
                            <tr className="table-secondary">
                                <th>TÊN</th>
                                <th>ĐỊA CHỈ</th>
                                <th>GIỚI TÍNH</th>
                                <th>EMAIL</th> 
                            </tr>
                        </thead>
                        
                            <TableDataStaff />
                       
                </table>
			</div>
    	);
    }
    	
}

export default ListStaff;