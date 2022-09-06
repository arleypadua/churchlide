import { useReducer} from "react"
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Stage from "./pages/Stage";
import 'remixicon/fonts/remixicon.css'
import SideBar from "./components/SideBar/SideBar";
import Bible from "./pages/Bible";
import { praiseQueueInitialState, praiseQueueReducer } from "./components/PraiseQueue/PraiseQueueReducer";
import AppContext from "./AppContext";
import { appInitialState, appReducer, loadInitialSettings } from "./AppReducer";
import Settings from "./pages/Settings";
import { useEffect } from "react";

function App() {
  const location = useLocation()
  const praiseQueueProviderState = {
    appReducer: useReducer(appReducer, appInitialState),
    praiseQueueReducer: useReducer(praiseQueueReducer, praiseQueueInitialState)
  }

  const shouldShowSideBar = () => !location.pathname.startsWith("/stage")

  useEffect(() => {
    const [_, dispatchApp] = praiseQueueProviderState.appReducer
    dispatchApp(loadInitialSettings())
  }, [])

  return (
    <main className="app">
      <AppContext.Provider value={praiseQueueProviderState}>
        { shouldShowSideBar() && <SideBar /> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stage/empty" element={<Stage />} />
          <Route path="/stage/praise/:collectionName/:praiseName" element={<Stage />} />
          <Route path="/stage/bible/:versionKey/:bookAbbreviation/:chapterIndex/:verseIndex" element={<Stage />} />
        </Routes>
      </AppContext.Provider>
    </main >
  );
}

export default App;
