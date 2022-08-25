import { Route, Routes } from "react-router-dom";
import SlideShow from "./components/SlideShow";
import collections from "./data/collections";
import Home from "./pages/Home";
import PraiseSlideShow from "./pages/PraiseSlideShow";

function App() {
  const selected = collections[0].songs[2]
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stage/praise/:collectionName/:praiseName" element={<PraiseSlideShow />} />
    </Routes>
  );
}

export default App;
