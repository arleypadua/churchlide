import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Stage from "./pages/Stage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stage/" element={<Stage />} />
      <Route path="/stage/praise/:collectionName/:praiseName" element={<Stage />} />
    </Routes>
  );
}

export default App;
