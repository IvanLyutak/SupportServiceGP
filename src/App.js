import React, { useRef } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navs/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ParkingAttendance from './components/pages/parking-attendance/ParkingAttendance';
import OperationCenter from './components/pages/operation-center/OperationCenter';
import Transactions from './components/pages/transactions/Transactions';
import Chat from './components/pages/chat/Chat';
import Authorization from './components/pages/authorization/Authorization';
import Users from './components/pages/users/Users';

import { ReactNotifications } from 'react-notifications-component'
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
          <Route path='/users' component={Users} />
          <Route path='/chat' component={Chat} />
          <Route path='/' component={Authorization} />
        </Switch>
    </Router>
  </main>
  );
}

export default App;
