import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./App.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import Workouts from "./Workouts";
import db from "./firebase";
import GetDate from "./GetDate";

import ScrollToTop from "./ScrollToTop";

import profil from "./images/profil.svg";

function App() {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const [dl, setDl] = useState([]); //TEST
  const doDate = "  ⌛ Sets: ";

  // when the app runs. it will check if we have workouts or not in the todo list.
  //useEffect ---> run once when the app loaded .
  useEffect(() => {
    // This code here... will run when app.js loaded.
    db.collection("Workouts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setToDos(
          snapshot.docs.map(doc => ({
            id: doc.id,
            Workout: doc.data().Workout,
          }))
        );
      });
  }, []); // <---- because of []  so will only run once

  const addTodo = event => {
    event.preventDefault(); //need this to stop form to refash the webpage

    db.collection("Workouts").add({
      //Submit workous into the database
      Workout: input + doDate + dl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setToDos([...todos, input]);
    setInput("");
    setDl("");
  };

  return (
    <div className="App">
      <header className="frontP">
        <div>
          <h1>Personal Trainer </h1>
          <p>Looking for Workouts never been that easy!!</p>
        </div>
        <div className="shadow" />
      </header>
      <body className="tbody">
        <div className="profile">
          <h1> Inspirational quote</h1>
          <img classNam="Pimg" src={profil} />
          <p>
            Of course it’s hard. It’s supposed to be hard. If it were easy,
            everybody would do it. Hard is what makes it great.
          </p>
        </div>
        <div className="calendar"> 
        </div>
        <div className="CalendarB"/>
      </body>

      <form className="tform">
        {/**Need to put inside form for the button to submit to back-end */}

        <FormControl className="Fcontrol">
          <InputLabel>🤸‍♀️Write your Workouts </InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>

        <FormControl className="Fcontrol">
          {/**TEST*/}
          <InputLabel>⏲Sets: </InputLabel>
          <Input value={dl} onChange={event => setDl(event.target.value)} />
        </FormControl>

        <Button
          className="AddB"
          disabled={!input || !dl}
          type="submit"
          onClick={addTodo}
          variant="contained"
        >
          💪 Add Workouts{" "}
          {/**use disabled ={!input} to stop submiting " NOTHING" */}
        </Button>
      </form>
      <div>
        {" "}
        <a>{GetDate()}</a>
      </div>
      <ul className="Lists">
        {todos.map(todo => (
          <Workouts todo={todo} />
        ))}
      </ul>
      <footer>
        <IconButton className="footerB">
          <ScrollToTop />
        </IconButton>
      </footer>
    </div>
  );
}

export default App;
