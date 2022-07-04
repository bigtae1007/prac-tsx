import React from "react";
import { firebaseConfig } from "./firebase/firebase";
import Todo from "./page/Todo";
function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
