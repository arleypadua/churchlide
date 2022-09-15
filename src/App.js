import 'remixicon/fonts/remixicon.css'

import { useReducer, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import AddPraise from "./pages/AddPraise/AddPraise";
import EditPraise from "./pages/EditPraise/EditPraise";
import Stage from "./pages/Stage/Stage";
import SideBar from "./components/SideBar/SideBar";
import Bible from "./pages/Bible/Bible";
import Settings from "./pages/Settings/Settings";

import AppContext from "./AppContext";
import { appInitialState, appReducer, loadSettings, loadCollections } from "./AppReducer";
import { praiseQueueInitialState, praiseQueueReducer } from "./components/PraiseQueue/PraiseQueueReducer";
import { cleanupListener, COLLECTIONS_CHANGED, onMessage, SETTINGS_CHANGED } from './pubsub/eventPublisher';

function App() {
  const location = useLocation()
  const praiseQueueProviderState = {
    appReducer: useReducer(appReducer, appInitialState),
    praiseQueueReducer: useReducer(praiseQueueReducer, praiseQueueInitialState)
  }
  const [_, dispatchApp] = praiseQueueProviderState.appReducer

  const shouldShowSideBar = () => !location.pathname.startsWith("/stage")

  const handleMessages = (event) => {
    const { type } = event.data
    if (type === SETTINGS_CHANGED) dispatchApp(loadSettings())
    if (type === COLLECTIONS_CHANGED) dispatchApp(loadCollections())
  }

  useEffect(() => {
    dispatchApp(loadSettings())
    dispatchApp(loadCollections())

    onMessage(handleMessages)
    return () => cleanupListener(handleMessages)
  }, [])

  return (
    <main className="app">
      <AppContext.Provider value={praiseQueueProviderState}>
        { shouldShowSideBar() && <SideBar /> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-praise" element={<AddPraise />} />
          <Route path="/edit-praise/:collectionName/:praiseName" element={<EditPraise />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/sync/microsoft" element={<Settings />} />
          <Route path="/stage/empty" element={<Stage />} />
          <Route path="/stage/praise/:collectionName/:praiseName" element={<Stage />} />
          <Route path="/stage/praise/:collectionName/:praiseName/:slideIndex" element={<Stage />} />
          <Route path="/stage/bible/:versionKey/:bookAbbreviation/:chapterIndex/:verseIndex" element={<Stage />} />
        </Routes>
      </AppContext.Provider>
    </main >
  );
}

export default App;
