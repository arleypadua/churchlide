import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Stage from "./pages/Stage";
import 'remixicon/fonts/remixicon.css'
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <main className="app">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage/" element={<Stage />} />
        <Route path="/stage/praise/:collectionName/:praiseName" element={<Stage />} />
      </Routes>
    </main>
  );
}

export default App;
