import React from 'react';
import { MDBBtn, MDBTable, MDBTableBody} from 'mdbreact';

const TablePage = (props) => {

  const rows_regular_btn = [
    {
      'indicator': [<i key="cell1" className="fa fa-circle mr-2 red-text" aria-hidden="true"></i>],
      'nameparking': 'Покровский бульвар, 11',
      'handle': <MDBBtn color="yellow" size="sm" onClick={() => props.find('Москва, Покровский бульвар, 11', [55.754096, 37.649238])}>Смотреть</MDBBtn>
    },
    {
        'indicator': [<i key="cell2" className="fa fa-circle mr-2 white-text" aria-hidden="true"></i>],
        'nameparking': 'Большой Саввинский переулок, 11',
        'handle': <MDBBtn color="yellow" size="sm" onClick={() => props.find('Большой Саввинский переулок, 11', [55.734157, 37.568201])}>Смотреть</MDBBtn>
    }
  ];

  return(
    <MDBTable btn scrollY maxHeight='200px'>
      <MDBTableBody rows={ rows_regular_btn } />
    </MDBTable>
  );
};

export default TablePage;