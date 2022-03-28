import React from 'react';
import { MDBTable, MDBTableBody } from 'mdbreact';

const TablePage = (props) => {

  return(
    <MDBTable btn scrollY maxHeight='200px'>
      <MDBTableBody rows={ props.data } />
    </MDBTable>
  );
};

export default TablePage;