import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Workouts from "./Workouts";
import db from "./firebase";

function App() {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const [dl, setDl] = useState([]); //TEST
  const doDate = "  ⌛  Do-Date: ";

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
      <h1>🏋️‍♀️ Workouts</h1>

      <form>
        {/**Need to put inside form for the button to submit to back-end */}

        <FormControl>
          <InputLabel>🤸‍♀️Write your Workouts </InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>

        <FormControl>
          {/**TEST*/}
          <InputLabel>⏲ Write your Deadline </InputLabel>
          <Input value={dl} onChange={event => setDl(event.target.value)} />
        </FormControl>

        <Button
          disabled={!input || !dl}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          💪 Add Workouts{" "}
          {/**use disabled ={!input} to stop submiting " NOTHING" */}
        </Button>
      </form>

      <ul className="Lists">
        {todos.map(todo => (
          <Workouts todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
