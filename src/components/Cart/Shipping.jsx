import React, { useEffect, useState } from "react";
import "./shipping.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Country, State, City } from "country-state-city";
import deliveryInfo from "../../Images/deliveryInfo.png";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { saveShippingInfo } from "../../actions/cartAction";

const Shipping = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, shippingInfo } = useSelector((state) => state.user);

  // use State
  const [address, setAddress] = useState(shippingInfo?.address);
  const [pincode, setPinCode] = useState(shippingInfo?.pincode);
  const [city, setCity] = useState(shippingInfo?.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [state, setState] = useState(shippingInfo?.state);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number Format Is Incorrect");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, phoneNo, state, country, pincode })
    );
    alert.success("Your Are One Step Ahead Of Placing Order");
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
      alert.error("Log In For Checkout");
    }
  }, [isAuthenticated]);

  return (
    <>
      <MetaData title="Delivery Info - ShopKaro" />
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <div className="shippingBoxSection-1">
            <img src={deliveryInfo} alt="" />
          </div>
          <div className="shippingBoxSection-2">
            <div>
              <h1>DELIVERY INFO</h1>
              <form
                className="shippingInfoForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div className="shippingCountry">
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {
                  <div className="shippingState">
                    {country ? (
                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option value={item.isoCode} key={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <select>
                        <option value="">State</option>
                      </select>
                    )}
                  </div>
                }
                {
                  <div className="shippingCity">
                    {state ? (
                      <select
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="">City</option>

                        {City &&
                          City.getCitiesOfState(country, state).map((item) => (
                            <option value={item.isoCode} key={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <select>
                        <option>City</option>
                      </select>
                    )}
                  </div>
                }
                <div>
                  <div>
                    <input
                      type="text"
                      placeholder="PinCode"
                      required
                      onChange={(e) => setPinCode(e.target.value)}
                      value={pincode}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="PhoneNo"
                      required
                      onChange={(e) => setPhoneNo(e.target.value)}
                      value={phoneNo}
                    />
                  </div>
                </div>

                <div className="placeOrderButton">
                  <button type="submit">CONTINUE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
