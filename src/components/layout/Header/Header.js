import React, { useState, Fragment, useEffect } from "react";
import "./header.css";
import cartIcon from "../../../Images/cartIcon.png";
import searchIcon from "../../../Images/searchIcon.png";
import avatar2 from "../../../Images/avatar2.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("topHeader");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const searchSubmitHandler = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  let input = document.getElementById("input");

  // to maintain the enter button in search box.
  input?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchIcon").click();
    }
  });

  // header scroll functionality

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    // it is best practice to remove event listner because of some issues.
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const controlNavbar = () => {
    const heightY = window.scrollY;

    if (heightY > 100) {
      if (heightY > lastScrollY) {
        setShow("hideHeader");
      } else {
        setShow("showHeader");
      }
    } else {
      setShow("topHeader");
    }
    setLastScrollY(heightY);
  };

  return (
    <>
      <header
        className={`${show}`}
        style={{ scrollBehavior: "smooth", transition: "all 1s"}}
      >
        <section>
          <div id="containerHeader">
            <div id="shopName">
              <Link to="/">
                <b>SHOP</b>Karo{" "}
              </Link>
            </div>

            <div id="collection">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/products">Products</Link>
              </div>
            </div>

            <div id="search">
              <input
                type="text"
                id="input"
                name="searchBox"
                placeholder="Search For Product..."
                onChange={(e) => setKeyword(e.target.value)}
              />

              <button id="searchIcon" onClick={searchSubmitHandler}>
                <img src={searchIcon} alt="search" />
              </button>
            </div>

            <div id="user">
              <div id="cart">
                <Link to={"/cart"}>
                  <img src={cartIcon} alt="cartIcon" />
                  <p
                    style={{
                      position: "absolute",
                      top: 14,
                      marginLeft: "15px",
                      color: "rgba(0,0,0,0.675)",
                    }}
                  >
                    {cartItems.length}
                  </p>
                </Link>
              </div>
              {isAuthenticated ? (
                <UserOptions user={user} />
              ) : (
                <div id="profile">
                  <Link to={"/login"}>
                    <img src={avatar2} alt="profile" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
