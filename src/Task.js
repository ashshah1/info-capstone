import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import './Task.css';
import EditHabit from './EditHabit.js';
import dots from './images/three-dots-vertical.svg';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { firestore } from './firebase';

function Task(props) {

    const [isShown, setIsShown] = useState(false); // keeps track of wehther complete buttons are visible

    // modal for edit
    const [edit, setEdit] = useState(false);
    const closeEdit = () => setEdit(false);
    const showEdit = () => setEdit(true);

    let currProgress = (props.currCount / props.taskFreq) * 100 + "%";
    const progressStyle = {
        width: currProgress,
        backgroundColor: props.color
    };

    let decor = "";
    if (props.complete === true) {
        decor = "line-through";
    }

    // sets default view, tasks are visible and "mark as complete" buttons are hidden
    let taskView = "";
    let markBtn = "hidden";

    const deleteHabit = () => {
        const habitRef = firestore
            .collection("Habits")
            .doc(props.id)
            .delete()
    }

    const handleClick = (event) => {
        props.whenClicked(props.taskName)
    }

    const handleUndo = (event) => {
        props.onUndo(props.taskName);
    }

    // on hover markBtn should be visible and taskView should be hidden
    const toggleView = () => {
        setIsShown(true);
    }

    const toggleBack = () => {
        setIsShown(false);
    }

    // on hover, set classNames to show mark complete buttons
    if (isShown) {
        taskView = "hidden";
        markBtn = "";
    }

    // if the current count is 0 (task bar is empty), users cannot undo
    let disabled = false;
    if (props.currCount === 0 || props.totalCount === 0) {
        disabled = true;
    }


    return (<div className="task-container" onMouseEnter={toggleView} onMouseLeave={toggleBack}>
        <div className="curr-progress" style={progressStyle}>
            &nbsp;
        </div>
        <div id="padding-div">
            <div className="container-one">
                <p className={taskView} style={{ textDecoration: decor }}>{props.taskName}</p>
            </div>
            <div className="container-two">
                <p>
                    <span className={taskView}>{props.taskDuration} &nbsp;</span>
                    <span className={taskView}>{props.currCount} {" / "}</span><span className={taskView}>{props.taskFreq}</span>
                </p>
                <p className={taskView}>{props.totalCount} total</p>
            </div>
            <div>
                <div className="hover-options">
                    <Button onClick={handleClick} className={"btn btn-info " + markBtn}>mark complete</Button>
                    <Button disabled={disabled} onClick={handleUndo} className={"btn btn-secondary " + markBtn}>undo</Button>

                    <Dropdown className={markBtn}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={showEdit}>Edit Habit</Dropdown.Item>
                            <Dropdown.Item onClick={deleteHabit}>Delete Habit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Modal show={edit} onHide={closeEdit}>
                        <Modal.Header closeButton>
                            <Modal.Title>EDIT HABIT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><EditHabit close={closeEdit} id={props.id} task={props}></EditHabit></Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    </div>);
}

export default Task;