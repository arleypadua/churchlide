import './SyncOneDrive.css'

import React, { useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { loginRequest } from '../../../auth/authConfig'
import { Client } from '@microsoft/microsoft-graph-client';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { parseJsonStreamToObject, toJsonFile } from '../../../helpers/streamHelpers';
import collectionsRepository from '../../../repositories/collectionsRepository';
import { useAppContext } from '../../../AppContext';
import settingsRepository from '../../../repositories/settingsRepository';

const ALL_COLLECTIONS_FILE_LOCATION = "/drive/special/approot:/collections/.collections-all:"
const ALL_SETTINGS_FILE_LOCATION = "/drive/special/approot:/settings/.settings-all:"

const SYNC_TYPE_EXPORT = 'export'
const SYNC_TYPE_IMPORT = 'import'

function SyncResult({ result: { type, collections, settings } }) {
  const typeText = type === SYNC_TYPE_EXPORT
    ? 'Salvo' : 'Restaurado'

  const settingsStatusClass = settings ? 'ri-check-line' : 'ri-close-line'

  return (
    <div className='sync_results'>
      <h3><b>{typeText}</b>:</h3>
      <p><i className={settingsStatusClass}></i> Configurações</p>
      {collections.map(c => (
        <p key={c.name}><i className='ri-check-line'></i> {c.name}: {c.songs} louvores</p>
      ))}
    </div>
  )
}

export default function SyncOneDrive() {
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState()
  const { instance, accounts } = useMsal();
  const { appReducer: [app] } = useAppContext()

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

  const save = async () => {
    setSyncing(true)

    const accessToken = await getAccessToken()

    const client = Client.init({
      authProvider: (callback) => callback(undefined, accessToken)
    })

    await client.api(`${ALL_COLLECTIONS_FILE_LOCATION}/content`)
      .put(toJsonFile(app.loadedCollections))
      .catch(error => console.error(error))

    await client.api(`${ALL_SETTINGS_FILE_LOCATION}/content`)
      .put(toJsonFile(app.settings))
      .catch(error => console.error(error))

    const syncResult = {
      type: SYNC_TYPE_EXPORT,
      collections: app.loadedCollections.map(c => ({ name: c.name, songs: c.songs.length })),
      settings: true
    }

    setSyncResult(syncResult)
    setSyncing(false)
  }

  const importFromOneDrive = async () => {
    setSyncing(true)

    const accessToken = await getAccessToken()

    const client = Client.init({
      authProvider: (callback) => callback(undefined, accessToken)
    })

    const syncResult = {
      type: SYNC_TYPE_IMPORT,
      collections: [],
      settings: false
    }

    const allCollectionsStream = await client.api(`${ALL_COLLECTIONS_FILE_LOCATION}/content`).getStream()
      .catch(error => console.error(error))

    if (allCollectionsStream) {
      const allCollections = await parseJsonStreamToObject(allCollectionsStream)
      collectionsRepository.persistCollections(allCollections)
      syncResult.collections = allCollections.map(c => ({ name: c.name, songs: c.songs.length }))
    }

    const allSettingsStream = await client.api(`${ALL_SETTINGS_FILE_LOCATION}/content`).getStream()
      .catch(error => console.error(error))

    if (allSettingsStream) {
      const allSettings = await parseJsonStreamToObject(allSettingsStream)
      settingsRepository.persistSettings(allSettings)
      syncResult.settings = true
    }

    setSyncResult(syncResult)
    setSyncing(false)
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
        <button className='button' onClick={save} disabled={syncing}>Salvar</button>
        <button className='button' onClick={importFromOneDrive} disabled={syncing}>Importar</button>
        <button className='button' onClick={logout} disabled={syncing}>LogOut (Microsoft)</button>

        {syncResult && <SyncResult result={syncResult} />}
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
