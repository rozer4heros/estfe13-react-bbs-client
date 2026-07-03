import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";

import "./App.css";
import BoardList from "./components/BoardList";
import Write from "./components/Write";
import View from "./components/View";

function App() {
  const [boardId, setBoardId] = useState(0);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const navigate = useNavigate();

  const handleModify = (_id) => {
    setBoardId(_id);
    setIsModifyMode(true);
    navigate("/write");
  };
  const handleCancel = () => {
    setBoardId(0);
    setIsModifyMode(false);
  };

  return (
    <div className="container p-5">
      <h1>React Simple BBS</h1>
      <Routes>
        <Route index element={<BoardList />} />
        <Route
          path="/write"
          element={<Write isModifyMode={isModifyMode} boardId={boardId} handleCancel={handleCancel} />}
        />
        <Route path="/view/:id" element={<View handleModify={handleModify} />} />
      </Routes>
    </div>
  );
}

export default App;
