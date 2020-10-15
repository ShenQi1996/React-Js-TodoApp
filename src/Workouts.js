import React, { useState } from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";

import "./Workouts.css";
import GetDate from "./GetDate";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Workouts(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [dl, setDl] = useState();

  const doDate = " ⌛ Do-Date : ";
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateWorkout = () => {
    db.collection("Workouts")
      .doc(props.todo.id)
      .set(
        {
          Workout: input + doDate + dl,
        },
        { merge: true }
      );
    handleClose();
    // update the workout with the input text
  };
  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>I am working </h1>
            <input
              className="iput1"
              placeholder={props.todo.Workout}
              value={input}
              onChange={event => setInput(event.target.value)}
            />
            <input
              className="iput2"
              placeholder="enter your deadline"
              value={dl}
              onChange={event => setDl(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={!input}
              disabled={!dl}
              onClick={updateWorkout}
            >
              Updata Workout
            </Button>
          </div>
        </Fade>
      </Modal>
      <List className="All-List">
        <div>{GetDate()}</div>
        <ListItem className="L-Item">
          <ListItemText className="L-text" primary={props.todo.Workout} />
        </ListItem>
        <Button onClick={e => setOpen(true) /** <--{handleOpen} same */}>
          Edit Me😲
        </Button>
        <DeleteForeverIcon
          onClick={event => {
            db.collection("Workouts").doc(props.todo.id).delete();
          }}
        />
      </List>
    </>
  );
}

export default Workouts;
