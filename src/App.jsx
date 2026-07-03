import { Route, Routes } from "react-router";

import "./App.css";
import BoardList from "./components/BoardList";
import Write from "./components/Write";
import View from "./components/View";

function App() {
  return (
    <div className="container p-5">
      <h1>React Simple BBS</h1>
      <Routes>
        <Route index element={<BoardList />} />
        <Route path="/write" element={<Write />} />
        <Route path="view/:id" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
