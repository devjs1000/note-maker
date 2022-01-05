import { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

function App() {
  const [heading, setHeading] = useState("");
  const [notes, setNotes] = useState([] as any);
  const [note, setNote] = useState("");
  const removeTask = (taskKey: string) => {
    let t: string = taskKey;
    let filtered = notes.filter((z: any) => t !== z["taskKey"]);
    setNotes(filtered);
    localStorage.setItem("notes-key", JSON.stringify(filtered));
  };
  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes-key") || ""));
    setHeading(localStorage.getItem("heading-key") || "");
    setNote(localStorage.getItem("note-key") || "");
  }, []);
  const markTask = (taskKey: string) => {
    let t: string = taskKey;
    let newList = notes.map((a: any) => {
      if (a["taskKey"] == t) {
        a["state"] = a["state"] ? 0 : 1;
        return a;
      } else {
        return a;
      }
    });
    setNotes(newList);
    localStorage.setItem("notes-key", JSON.stringify(newList));
  };
  return (
    <div className="App">
      <nav>
        <img src="todo.png" alt="logo" />
        <h1>notes maker</h1>
      </nav>

      <div>
        <input
          value={heading}
          type="text"
          onChange={(e) => {
            setHeading(e.target.value);
            localStorage.setItem("heading-key", e.target.value);
          }}
          placeholder="heading"
        />
      </div>

      <div id="notes-area">
        <h1>{heading}</h1>

        <div className="tasks">
          {notes.map((a: any) => {
            return (
              <Task
                markfn={markTask}
                removefn={removeTask}
                state={a["state"]}
                taskKey={a["taskKey"]}
                key={a["taskKey"]}
                task={a["value"]}
              />
            );
          })}
        </div>
      </div>
      <div>
        {note && (
          <div className="task">
            <span>{note}</span>
            <button
              onClick={() => {
                setNote("");
              }}
              className="remove"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </div>
      <input
        value={note}
        type="text"
        onKeyUp={(e) => {
          if (e.keyCode == 13) {
            let newNotes = [
              ...(notes as any),
              {
                value: note,
                taskKey: `${note + Math.random() * 100}`,
                state: false,
              } as any,
            ] as any;
            setNotes(newNotes);
            setNote("");
            localStorage.setItem("notes-key", JSON.stringify(newNotes));
          }
        }}
        placeholder="write your note in steps"
        onChange={(e) => {
          setNote(e.target.value);
          localStorage.setItem("note-key", e.target.value);
        }}
        className="note-adder"
      />
    </div>
  );
}

export default App;
