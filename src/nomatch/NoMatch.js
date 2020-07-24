import React from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router-dom';

class  NoMatch extends React.Component {
  onBack = () => {
    this.props.history.push('/login');
  }
  render(){
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={this.onBack}>Back Home</Button>}
        />
      </>
    );
  }
}
export default withRouter( NoMatch);