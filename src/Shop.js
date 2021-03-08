import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import tester from './images/a1.png';
import background from './images/bg-one.png'
import { Context } from "./Context";
import { avatars, backgrounds } from './Vectors.js'


import './Shop.css';

// depending on how data is fetched, could use a for loop here to create individual avatar and background elements to render, would be more efficient and less tedious in the return. would also give us the flexibility to keep adding new customizations without changing code

function Shop() {
    const { user } = useContext(Context);

    const [isActive, setActive] = useState(false); // when false, show avatars. when true, show backgrounds

    const toggleViews = () => {
        setActive(!isActive);
    }

    let currAvatars = user.avatarOwn; // array of currently owned avatars
    let currSelected = user.avatarSelected; // the current avatar that the user has selected

    let currBg = user.bgOwn;
    let bgSelected = user.bgSelected;

    let avatarArray = [];
    for (let i = 0; i < avatars.length; i++) {
        let newAvatar;
        if (currSelected === i) {
            newAvatar = <AvatarElem key={avatars[i]} src={avatars[i]} class="selected btn btn-light" status="selected"></AvatarElem>
            // populate in preview somehow
        } else if (currAvatars.includes(i)) {
            newAvatar = <AvatarElem key={avatars[i]} src={avatars[i]} class="selected btn btn-warning" status="select"></AvatarElem>
        } else {
            newAvatar = <AvatarElem key={avatars[i]} src={avatars[i]} class="selected btn btn-success" status="insert price"></AvatarElem>
        }

        if (i > avatars.length) {
            newAvatar = <AvatarElem key={avatars[i]} src={avatars[i]} class="btn btn-success" status="insert price"></AvatarElem>
        }
        avatarArray.push(newAvatar)
    }

    let bgArray = [];
    for (let i = 0; i < 4; i++) {
        let newBg;
        if (bgSelected === i) {
            newBg = <BackgroundElem src={backgrounds[i]} locked="bg-box" class="selected btn btn-light"></BackgroundElem>
        } else if (currBg.includes[i]) {
            newBg = <BackgroundElem src={backgrounds[i]} locked="bg-box" class="selected btn btn-warning"></BackgroundElem>
        } else {
            newBg = <BackgroundElem src={backgrounds[i]} locked="bg-box" class="selected btn btn-success"></BackgroundElem>
        }
        if (i >= backgrounds.length) {
            newBg = <BackgroundElem key={backgrounds[i]} locked="bg-box still-locked" src={backgrounds[i]} class="btn btn-success" status="insert price"></BackgroundElem>
        }


        bgArray.push(newBg);
    }

    if (!isActive) {
    return (
        <div>
            <div className="button-container">
                <Button variant="info" className="active">AVATARS</Button>
                <Button variant="outline-info" onClick={toggleViews} className="not-active">BACKGROUNDS</Button>
            </div>
            <div className="avatar-view">
                <div className="container">
                    <div className="row">
                        {avatarArray}
                    </div>
                </div>
            </div>
        </div>
    );
    } else {
        return (
            <div>
             <div className="button-container">
                 <Button variant="outline-info" onClick={toggleViews} className="not-active">AVATARS</Button>
                 <Button variant="info" className="active">BACKGROUNDS</Button>
             </div>
             <div className="background-view">
                 <div className="container">
                     <div className="row">
                         {bgArray}
                     </div>
                 </div>
             </div>
         </div>
        )
    }
}

function AvatarElem(props) {
    return (
        <div className="col-md-4 col-lg-4">
            <div className="an-avatar">
                <p>AVATAR NAME</p>
                <img className="avatar-img" src={props.src}></img>
                <button className={props.class}>{props.status}</button>
            </div>
        </div>
    )
}

function BackgroundElem(props) {
    return (
        <div className="col-md-6 col-lg-6">
            <div className={props.locked} style={{ backgroundImage: `url(${props.src})`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                {/* <img className="bg-img" src={props.src}></img> */}
                <button className={props.class}>selected</button>
            </div>
        </div>
    )
}

export default Shop;