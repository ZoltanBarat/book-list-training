import React, { useEffect, useState } from 'react'
import "./NotificationModal.css";

function NotificationModal() {  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let status = sessionStorage.getItem("showed");
    if(!status){
      setVisible(true);
      sessionStorage.setItem("showed", "true");
    }

    console.log(sessionStorage.getItem("showed"));
  }, []);
  
  if (visible) {
    return (
      <div className="NModalWrapper">
        <div className="NModalContainer">
        <p>This webpage is intended solely for showcase purposes. It is not intended for live use or to serve any functional purpose. It is designed solely to demonstrate the capabilities of my web developer skill and to provide a visual representation of my work. Please note that any functionality or links on this webpage may not be functional, and any information displayed may not be accurate or up-to-date. Thank you for your understanding.</p>
      <button className="btn NModalBtn" onClick={() => setVisible(false)}>I understand!</button>
        </div>
      </div>
    );
  }
    
  return null;
  
}

export default NotificationModal