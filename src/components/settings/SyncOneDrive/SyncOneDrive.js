import './SyncOneDrive.css'

import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { loginRequest } from '../../../auth/authConfig'
import { Client } from '@microsoft/microsoft-graph-client';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import collections from '../../../data/collections';

export default function SyncOneDrive() {
  const { instance, accounts } = useMsal();

  const logIn = async () => {
    await instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    });
  }

  const getAccessToken = async () => {
    const accessTokenRequest = { ...loginRequest, account: accounts[0] }
    const { accessToken } = await instance.acquireTokenSilent(accessTokenRequest).catch(error => {
      if (error instanceof InteractionRequiredAuthError) {
        return instance.acquireTokenPopup(accessTokenRequest)
          .catch(error => console.log(error))
      }
    })
    return accessToken
  }

  const sync = async () => {
    const accessToken = await getAccessToken()

    const client = Client.init({
      authProvider: (callback) => callback(undefined, accessToken)
    })

    const blob = new Blob([JSON.stringify(collections)], { type: 'application/json' })
    await client.api("/drive/special/approot:/.collections:/content").put(blob)
  }

  const logout = async () => {
    instance.logout({
      postLogoutRedirectUri: "/settings",
    })
  }

  const renderUnauthenticated = () => {
    return (
      <button className='button' onClick={logIn}>LogIn (Microsoft)</button>
    )
  }

  const renderAuthenticated = () => {
    return (
      <div>
        <button className='button' onClick={sync}>Sincronizar</button>
        <button className='button' onClick={logout}>LogOut (Microsoft)</button>
      </div>
    )
  }

  return (
    <div>
      <AuthenticatedTemplate>
        {renderAuthenticated()}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {renderUnauthenticated()}
      </UnauthenticatedTemplate>
    </div>
  )
}
