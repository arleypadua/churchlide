const outgoingChannel = new BroadcastChannel('presentr-topic');
const incomingChannel = new BroadcastChannel('presentr-topic');

function publishMessage(type, payload) {
  outgoingChannel.postMessage({
    type,
    payload
  })
}

function onMessage(callback) {
  incomingChannel.addEventListener('message', callback)
}

function cleanupListener(callback) {
  incomingChannel.removeEventListener('message', callback)
}

export {
  publishMessage,
  onMessage,
  cleanupListener,
}

export const NEXT_ACTION = 'next'
export const PREVIOUS_ACTION = 'previous'
export const NAVIGATE_ACTION = 'navigate'
export const SETTINGS_CHANGED = 'settings_changed'
export const COLLECTIONS_CHANGED = 'collections_changed'