import React from 'react';
import playstore from "../../../Images/playstore.png";
import ios from "../../../Images/ios.png"
import "./footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
      <div className="leftfooter">
        <h4>Download Our App</h4>
        <p>Download for Android and IOS Mobile Phones</p>
        <img src={playstore} alt="playstore" />
        <img src={ios} alt="ios" />
      </div>
      <div className="midfooter">
        <h1>ShopKaro.</h1>
        <p>Copyright @2023 all right reserved ShopKaro</p>
      </div>
      <div className="rightfooter">
        <h2>Follow Us On</h2>
        <a href="https://www.linkedin.com/in/akash-singh-78897620b/">Linkedin</a>
        <a href="https://www.linkedin.com/in/akash-singh-78897620b/">Instagram</a>
        <a href="https://www.linkedin.com/in/akash-singh-78897620b/">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer