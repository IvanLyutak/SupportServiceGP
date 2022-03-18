import React from 'react'
import "./OperationCenter.css"
import { Form, Button } from 'react-bootstrap'
import TableOperationCenter from './TableOperationCenter';
import TablePage from './TableListParking';
import { YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "../../FirebaseConfig";

import connectionVPN from '../../services/connectionVPN';
import snmpRequest from '../../services/snmpRequest';

import Modal from './OperationCenterModal';
import { MDBBtn, MDBIcon} from 'mdbreact';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Notify from './Notify';




const getPointOptions = () => {
  return {
    preset: "islands#yellowIcon"
  };
};

class OperationCenter extends React.Component{
    constructor(){
      super();
      this.state = {
        data_table: {},
        isModal: false,
        parking_list: []
      }
      this.onMapClick = this.onMapClick.bind(this);
      this.find = this.find.bind(this);
      this.reboot = this.reboot.bind(this);
      this.find_coordinates_address = this.find_coordinates_address.bind(this);
      this.reboot_server = this.reboot_server.bind(this);

    }


    componentDidMount() {
      const db = getDatabase(initializeApp(firebaseConfig));
      const starCountRef = ref(db, 'operation_center/parking_address/');

      onValue(starCountRef, (snapshot) => {
        if (snapshot.val() == null){
          return
        }
        var dict=[]
        for (const [key, value] of Object.entries(snapshot.val())) {
            dict.push({
              'indicator': <MDBBtn tag="a" size="sm" color="warning" onClick={() => this.reboot_server(key, [value["ipAddress"], value["nameVPN"], value["typeVPN"]])}><MDBIcon icon="redo-alt" /></MDBBtn>,
              'nameparking': key,
              'handle': <MDBBtn color="yellow" size="sm" onClick={() => this.find(key, [value["lat"], value["lon"]])}>Смотреть</MDBBtn>
            });
        }
        this.setState({ parking_list: dict })
      })
    }


    //Перезагрузка сервера
    reboot(nameVPN, ipAddress, typeVPN){
      if (typeVPN == 'OpenVPN') {
           console.log('Нотификацию сюда')
      }

      connectionVPN(nameVPN, function (check) {
        if (check !== "error") {
          console.log(typeVPN)
          console.log("Включить")
          snmpRequest(ipAddress, 161, ".1.3.6.1.4.1.25728.5800.3.1.3.1", "SET", 0)
          setTimeout(() => {
            console.log("Выключить")
            snmpRequest(ipAddress, 161, ".1.3.6.1.4.1.25728.5800.3.1.3.1", "SET", 1) 
          }, 5000);
        }
     })
    }


    reboot_server(address, value){
      this.setState({ isModal: true})
      this.address = address;
      this.value = value;
    }

    onConfirmModal = () => {
      let password = document.getElementById("formBasicPassword").value;
      let user_test = JSON.parse(localStorage.getItem('user_test'));

      const auth = getAuth();
      let radio_1 = document.getElementById('radio-1').checked;
      let radio_2 = document.getElementById('radio-2').checked;

      console.log("Перезагрузка реле шлагбаума");




      signInWithEmailAndPassword(auth, user_test.currentUser['email'], password)
        .then((userCredential) => {

            if (radio_1) {
                Notify("Перезагрузка", "Сервер перезагружается", "success", 5000);
                this.reboot(this.value[1], this.value[0], this.value[2]);
            } else if (radio_2) {
                Notify("Перезагрузка", "Реле шлакбаума перезагружается", "success", 5000);

            } else {
                Notify("Ошибка", "Выберите тип перезагрузки", "danger", 5000);
            }

            })
            .catch((error) => {
                Notify("Ошибка", "Введён неверный пароль", "danger", 5000);
                console.log(error)

        });

      this.setState({ isModal: false})


    }




    find(address, coords){
      if (this.props.map.current) {
        this.props.map.current.panTo(coords);
      }
      const db = getDatabase(initializeApp(firebaseConfig));
      const starCountRef = ref(db, 'operation_center/'+address+"/");

      onValue(starCountRef, (snapshot) => {
         if(snapshot.val() == null || !("error_server" in snapshot.val())){
            this.setState({ data_table: {}})
            var elem = document.getElementsByClassName('nameParking');
            elem[0].innerHTML = ""
            console.log("Error");
            return;
         }

        //Пример вызова метода перезагрузки сервера
        //this.reboot(snapshot.val()["nameVPN"], snapshot.val()["ipAddress"]) // nameVPN = GeneralParking, ipAddress = 192.168.0.100

         elem = document.getElementsByClassName('nameParking');
         elem[0].innerHTML = address
         var load_data = [];
         var pad = function(i) { return (i < 10) ? '0' + i : i; };

         for (const [key, value] of Object.entries(snapshot.val()["error_server"])) {
            value["time"] = (value["time"]).split('.')[0]
            var local_time = new Date(value["time"] + ' UTC');
            value["time"] = local_time.getFullYear() + '-' +
                pad(local_time.getMonth() + 1) + '-' + pad(local_time.getDate()) + ' '
                + pad(local_time.getHours()) + ':' + pad(local_time.getMinutes()) + ':' +
                pad(local_time.getSeconds());

            load_data.push(value)
         }

         this.setState({
            data_table: {
              columns: [
                {
                  label: 'Дата',
                  field: 'time',
                  sort: 'asc'
                },
                {
                  label: 'Тип сообщения',
                  field: 'type',
                  sort: 'asc'
                },
                {
                  label: 'Текст сообщения',
                  field: 'text',
                  sort: 'asc'
                }
              ],
              rows: load_data.reverse()
            }
         })
      });
    }


    find_coordinates_address(coords){
      switch (coords[0]+"-"+coords[1]) {
        case '55.734157-37.568201':
          return 'Большой Саввинский переулок, 11'
        case '55.754096-37.649238':
          return 'Москва, Покровский бульвар, 11'
        default:
          return ""
      }
    }


    onMapClick = (e) => {
      const coords = e.get("target")["geometry"]["_coordinates"];
      console.log(coords)
      this.find(this.find_coordinates_address(coords), coords)
    }

    onClose = () => {
      this.setState({ isModal: false})
    }





   render(){

    return (
      <>
          {(JSON.parse(localStorage.getItem('user')) === false) ? (
            <div className="welcome-user"> Авторизуйтесь! </div>
            ) : (
              <>
            <Form className="col-2-5">
              <div className="col-2-5-1">
                <Modal
                  visible={this.state.isModal}
                  title='Выберите действие'
                  content={
                    <div>
                      <div className="radio">
                        <input id="radio-1" value="server reboot" name="radio" type="radio"/>
                        <label htmlFor="radio-1" className="radio-label"> Перезагрузка сервера</label>
                      </div>
                      <div className="radio">
                        <input id="radio-2" value="relay reboot" name="radio" type="radio"/>
                        <label  htmlFor="radio-2" className="radio-label"> Перезагрузка реле шлагбаума</label>
                      </div>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль админа</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                      </Form.Group>
                    </div>
                  }
                  footer={
                    <div>
                        <Button variant='size' type="submit" className="btn_close" onClick={this.onClose}>
                          Закрыть
                        </Button>
                        <Button variant='size' type="submit" className="btn_reboot" onClick={this.onConfirmModal}>
                          Перезагрузить
                        </Button>
                    </div>
                  }

                  onClose={this.onClose}
                 />

                <div className="col-2-5-1-1">
                  <TablePage find={this.find} reboot_server={this.reboot_server} data={this.state.parking_list}/>
                </div>
                <div className="col-2-5-1-2">
                  <YMaps>
                      <Map
                        defaultState={{ center: [55.73, 37.60], zoom: 10 }}
                        width='100%'
                        height='298px'
                        instanceRef={this.props.map}
                      >
                        <Clusterer
                          options={{
                            preset: "islands#invertedYellowClusterIcons",
                            groupByCoordinates: false,
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                          }}
                        >
                          <Placemark
                            geometry={[55.734157, 37.568201]}
                            onClick={this.onMapClick}
                            options={getPointOptions()}
                          />
                          <Placemark
                            geometry={[55.754096, 37.649238]}
                            onClick={this.onMapClick}
                            options={getPointOptions()}/>
                        </Clusterer>
                      </Map>
                  </YMaps>
                </div>
              </div>
            </Form>
            <Form className="col-3-5">
                <div className="col-3-5-1">
                  <div className="nameParking"></div>
                  <div className="col-3-5-1-1">
                    <TableOperationCenter data_table={this.state.data_table}/>
                  </div>
               </div>
            </Form>
            </>
            )};
        </>
    );
   }
}
export default OperationCenter