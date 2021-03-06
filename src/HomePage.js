import { Context } from "./Context";
import React, { useState, useContext } from "react";
import { phrases } from './constants.js';

import TaskList from "./TaskList.js";
import XPBar from "./XPBar.js";
import LandingPage from "./LandingPage.js";

import { avatars, backgrounds, overlays, defaultIcons, lightIcons } from './Vectors.js';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import coin from "./images/coin.png";
import calIcon from "./images/icon-calendar.png";
import statsIcon from "./images/icon-stats.png";
import shopIcon from "./images/icon-shop.png";
import shopIconLight from './images/icon-shop-lg.png'
import avatarIcon from "./images/icon-avatar.png";
import avatarIconLight from './images/icon-avatar-lg.png';
import checkInIcon from './images/icon-check.png';
import checkInIconLight from './images/icon-check-lg.png';
import Shop from './Shop.js';
import { Navbar, Nav } from 'react-bootstrap';

import ProfileView from './ProfileView.js'

import "./HomePage.css";
import CheckInModal from "./CheckInModal";

function HomePage() {
  // modal for shop
  const [shop, setShop] = useState(false);
  const closeShop = () => setShop(false);
  const showShop = () => setShop(true);

  // modal for profile
  const [profile, setProfile] = useState(false);
  const closeProfile = () => setProfile(false);
  const showProfile = () => setProfile(true);

  // modal for check-in
  const [mood, setMood] = useState(false);
  const closeMood = () => setMood(false);
  const showMood = () => setMood(true);

  const { user } = useContext(Context);
  let currDate = new Date().getDate();

  // if user is logged in, displays their Home Page with tasks and avatar. if user is not logged in, displays log in page
  if (user) {

    let currShop;
    let profileIcon;
    let coinDiv;
    let checkIcon;
    let currTheme;

    // set dark mode icons
    if (user.bgSelected === 1) {
      currShop = shopIconLight
      profileIcon = avatarIconLight
      coinDiv = "coin-div"
      checkIcon = checkInIconLight;
      currTheme = "level dark";

    } else {
      currShop = shopIcon
      profileIcon = avatarIcon
      coinDiv = "coin-div"
      checkIcon = checkInIcon;
      currTheme = "level light"
    }

    return (
      <main>
        <div className="whole-background" style={{ backgroundImage: `url(${backgrounds[user.bgSelected]})` }}></div>
        <div className="background animations bounce-1" style={{ backgroundImage: `url(${overlays[user.bgSelected]})` }}></div>
        <div className="background animations bounce-1" style={{ backgroundImage: `url(${overlays[4]})` }}></div>
        {/* <img className="background" src={backgrounds[user.bgSelected]} alt="trees and blue skies"></img> */}
        {/* <img className="background animations bounce-1" src={overlays[user.bgSelected]}></img> */}
        {/* <img className="background animations bounce-1" src={overlays[4]}></img> */}

        <div className="home-content">
          <Navbar expand="lg">
            <Navbar.Brand className="nav-part1">
              <img src={currShop} style={{ cursor: "pointer" }} className="icon" onClick={showShop}></img>
              <div className={coinDiv}>
                <img className="coin" src={coin}></img>
                <div>{user.points} <span className="coin-label">coins</span></div>
              </div>

            </Navbar.Brand>


            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto"> */}
            {/* <li className="nav-item">  no stats or cal icon for now
                  <img src={calIcon} className="icon"></img>
                </li>
                <li className="nav-item">
                  <img src={statsIcon} className="icon"></img>
                </li> */}
            <div className="nav-part2 ml-auto">
              <XPBar theme={currTheme} level={user.level} currXP={user.exp} totalXP="100"></XPBar>
              <div>
                <img src={checkIcon} onClick={showMood} style={{ cursor: "pointer" }} className="icon"></img>
                <img src={defaultIcons[user.currentIcon]} style={{ cursor: "pointer" }} className="icon" onClick={showProfile}></img>
              </div>
            </div>
            {/* </Nav>
            </Navbar.Collapse> */}
          </Navbar>

          <div className="img-container vert-move">
            <p className="speech-bubble">{phrases[currDate].value}</p>
            <img className="curr-avatar mt-4" src={avatars[user.avatarSelected]} alt="animated personal avatar"></img>
          </div>

          <div className="content-containers">
            <TaskList></TaskList>
          </div>

          <Modal show={shop} onHide={closeShop}>
            <Modal.Header closeButton>
              <Modal.Title>SHOP</Modal.Title>
            </Modal.Header>
            <Modal.Body><Shop></Shop></Modal.Body>
          </Modal>

          <Modal show={mood} onHide={closeMood}>
            <Modal.Header closeButton>
              <Modal.Title>DAILY CHECK IN</Modal.Title>
            </Modal.Header>
            <Modal.Body><CheckInModal close={() => closeMood}></CheckInModal></Modal.Body>
          </Modal>

          <Modal show={profile} onHide={closeProfile}>
            <Modal.Header closeButton>
              <Modal.Title>PROFILE</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body><button className="sign-in btn btn-outline-dark m-3" onClick={() => fireauth.signOut()}>Log Out</button> */}
            <Modal.Body><ProfileView></ProfileView></Modal.Body>
          </Modal>
        </div>
      </main>
    )
  } else {
    return (
      <div>
        <LandingPage>

        </LandingPage>
        {/* <LogInPage>
        </LogInPage> */}
      </div>
    )
  }
};

export default HomePage;