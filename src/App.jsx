import "./App.css";
import BoardList from "./components/BoardList";
import Write from "./components/Write";

function App() {
  return (
    <div className="container p-5">
      <h1>React Simple BBS</h1>
      <BoardList />
      <Write />
    </div>
  );
}

export default App;
