import React, { useRef } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ParkingAttendance from './Components/pages/ParkingAttendance';
import OperationCenter from './Components/pages/OperationCenter';
import Transactions from './Components/pages/Transactions';
import Chat from './Components/pages/Chat';
import Authorization from './Components/pages/Authorization';

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  const map_yandex = useRef(null);
  return (
    <main>
     <ReactNotifications />
      <Router>
      <NavBar />
        <Switch>
          <Route path='/parking_attendance' component={ParkingAttendance} />
          <Route path='/transactions' component={Transactions} />
          <Route path='/operations_center' render={(props) => (
              <OperationCenter map={map_yandex}/>
            )} />
          <Route path='/chat' component={Chat} />
          <Route path='/' component={Authorization} />
        </Switch>
    </Router>
  </main>
  );
}

export default App;
