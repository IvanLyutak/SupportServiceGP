import React, { useState } from "react";
import '../../App.css';
const Notification = props => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);
  
    const handleStartTimer = () => {
      const id = setInterval(() => {
        setWidth(prev => {
          if (prev < 100) {
            return prev + 0.5;
          }
  
          clearInterval(id);
          return prev;
        });
      }, 20);
  
      setIntervalID(id);
    };
  
    const handlePauseTimer = () => {
      clearInterval(intervalID);
    };
  
    const handleCloseNotification = () => {
      handlePauseTimer();
      setExit(true);
      setTimeout(() => {
        props.dispatch({
          type: "REMOVE_NOTIFICATION",
          id: props.id
        })
      }, 400)
    };
  
    React.useEffect(() => {
      if (width === 100) {
        handleCloseNotification()
      }
    }, [width])
  
    React.useEffect(() => {
      handleStartTimer();
    }, []);
  
    return (
      <div
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleStartTimer}
        className={`notification-item ${
          props.type === "SUCCESS" ? "success" : "error"
        } ${exit ? "exit" : ""}`}
      >
          <div className="button-close-notification">
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setWidth(100)}></button>
          </div>
          {props.title && <div className="title-notification">{props.title}</div>}
          <p className="message-notification">{props.message}</p>
        <div className={"bar"} style={{ width: `${width}%` }} />
      </div>
    );
  };
  
  export default Notification;
