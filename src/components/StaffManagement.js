import React from 'react';
import Header from "./Header";
import ListStaff from "./ListStaff";

class AccountManagement extends React.Component  {
    render () {
    	return(
			<div>
				<Header/>
				<br/>
				<div className="container">
					<div className="row">
						<button className="btn btn-outline-primary col-4">Nhân viên</button>
						<button className="btn btn-outline-primary col-4">Nhóm - tổ</button>
						<button className="btn btn-outline-primary col-4">Quyền - chức vụ</button>
					</div>
					<ListStaff/>
				</div>
			</div>
    	);
    }
    	
}

export default AccountManagement;
