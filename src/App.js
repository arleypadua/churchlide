import { useReducer} from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Stage from "./pages/Stage";
import 'remixicon/fonts/remixicon.css'
import SideBar from "./components/SideBar/SideBar";
import Bible from "./pages/Bible";
import { praiseQueueInitialState, praiseQueueReducer } from "./components/PraiseQueue/PraiseQueueReducer";
import AppContext from "./AppContext";

function App() {
  const praiseQueueProviderState = {
    praiseQueueReducer: useReducer(praiseQueueReducer, praiseQueueInitialState)
  }

  return (
    <main className="app">
      <AppContext.Provider value={praiseQueueProviderState}>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/stage/" element={<Stage />} />
          <Route path="/stage/praise/:collectionName/:praiseName" element={<Stage />} />
        </Routes>
      </AppContext.Provider>
    </main >
  );
}

export default App;
