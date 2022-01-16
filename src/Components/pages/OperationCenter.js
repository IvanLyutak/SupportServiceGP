import React from 'react'
import "./OperationCenter.css"
import { Form } from 'react-bootstrap'
import TableOperationCenter from './TableOperationCenter';
import TablePage from './TableListParking';
import { YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "../../FirebaseConfig";

const getPointOptions = () => {
  return {
    preset: "islands#yellowIcon"
  };
};

class OperationCenter extends React.Component{
    constructor(){
      super();
      this.state = { data_table: {}}
      this.onMapClick = this.onMapClick.bind(this);
      this.find = this.find.bind(this);
      this.find_coordinates_address = this.find_coordinates_address.bind(this);
    }
    find(address, coords){
      console.log(address)
      if (this.props.map.current) {
        this.props.map.current.panTo(coords);
      }
      const db = getDatabase(initializeApp(firebaseConfig));
      const starCountRef = ref(db, 'operation_center/'+address+"/");

      onValue(starCountRef, (snapshot) => {
         if(snapshot.val() == null){
            this.setState({ data_table: {}})
            var elem = document.getElementsByClassName('nameParking'); 
            elem[0].innerHTML = ""
            console.log("Error");
            return;
         }
         elem = document.getElementsByClassName('nameParking'); 
         elem[0].innerHTML = address
         var load_data = [];
         for (const [key, value] of Object.entries(snapshot.val()["error_server"])) {
            console.log(key)
            load_data.push(value)
         }
         console.log(load_data)
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
   render(){
    return (
      <>
          {(JSON.parse(localStorage.getItem('user')) === false) ? (
            <div className="welcome-user"> Авторизуйтесь! </div>
            ) : (
              <>
            <Form className="col-2-5">
              <div className="col-2-5-1">
                <div className="col-2-5-1-1">
                  <TablePage find={this.find}/>
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