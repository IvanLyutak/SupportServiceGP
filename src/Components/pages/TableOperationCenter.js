import React from 'react'
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

class TableOperationCenter extends React.Component{
  componentDidMount() {
  }
  componentDidUpdate(props) {
  }
  render () {
    return (
      <div>
        <div id="table_top">
          <MDBDataTable striped hover data={this.props.data_table}/>
        </div>
      </div>
    );
  }
}

export default TableOperationCenter;