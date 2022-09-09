const channel = new BroadcastChannel('presentr-topic');

function publishMessage(type, payload) {
    channel.postMessage({
        type,
        payload
    })
}

function onMessage(callback) {
    channel.addEventListener('message', callback)
}

function cleanupListener(callback) {
    channel.removeEventListener('message', callback)
}

export {
    channel,
    publishMessage,
    onMessage,
    cleanupListener,
}

export const NEXT_ACTION = 'next'
export const PREVIOUS_ACTION = 'previous'
export const NAVIGATE_ACTION = 'navigate'
export const SETTINGS_CHANGED = 'settings_changed'
export const COLLECTIONS_CHANGED = 'collections_changed'