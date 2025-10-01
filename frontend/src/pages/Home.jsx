import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="bg">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            {/* Left Side - Text Content */}
            <div className="hero-text">
              <h1 className="hero-title">
                We provide the
                <br />
                best food for you
              </h1>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <div className="hero-buttons">
                <a href="/#menu">
                  <button className="btn-primary">Menu</button>
                </a>
              </div>
              <div className="hero-social">
                <div className="social-icon">
                  <span>
                    <FaFacebookF />
                  </span>
                </div>
                <div className="social-icon">
                  <span>
                    <FaInstagram />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div
            //  className="hero-image"
            >
              <div className="image-container">
                <div className="food-image">
                  {/* Placeholder for food image */}
                  <div
                  // className="food-placeholder"
                  >
                    <img
                      className="food-image"
                      src="/dish-2 1.png"
                      alt="dish image"
                    />
                  </div>
                </div>
                <div className="">
                  {/* Placeholder for restaurant interior */}
                  <div className="restaurant-placeholder">
                    <img
                      className=" restaurant-image"
                      src="pexels-volkan-vardar-3887985 1.png"
                      alt="restaurant image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
      </section>
      <div className="bg-decoration bg-decoration-1"></div>
      {/* <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div> */}
      <section className="menu-section" id="menu">
        <div className="menu-container">
          <div className="menu-text">
            <h2 className="menu-title">
              Our <br /> Menu
            </h2>
            <p className="menu-p">the best dishes in the city</p>
            <a href="/book">
              <button className="btn-secondary">Book Table</button>
            </a>
          </div>
          <div className="bg-decoration-2"></div>
          <img src="/menu.png" alt="menu" className="menu-image" />
        </div>
      </section>
    </div>
  );
};

export default Home;
