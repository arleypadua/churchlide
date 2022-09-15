import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";
import './style.css'

const msalInstance = new PublicClientApplication(msalConfig);

function BrowserRouterStrategy({ children }) {
  const renderBrowserRouter = () => <BrowserRouter>{children}</BrowserRouter>
  const renderHashRouter = () => <HashRouter>{children}</HashRouter>

  if (process.env.REACT_APP_ROUTE_STRATEGY === 'browser') return renderBrowserRouter()
  if (process.env.REACT_APP_ROUTE_STRATEGY === 'hash') return renderHashRouter()

  return (<>No router</>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouterStrategy>
        <App />
      </BrowserRouterStrategy>
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
