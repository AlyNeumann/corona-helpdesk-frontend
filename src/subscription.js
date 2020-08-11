//TODO: gonna try grabbing JWT for user id
import Cookies from 'js-cookie';

const token = Cookies.get("token");
const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription, userId) {

  console.log('do we get here in subscription with user?')
  console.log(subscription)
  console.log(token)
  console.log(userId)

  // const body = { subscription, userId: userId }
  //${userId}
  // const userId = user._id
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify({ subscription, userId }),
    headers: {
      'Content-Type': 'application/json',
      // 'Userid': userId
    }
  }).then(res => res.json())
    .then(response => {
      console.log(response)
    })
  // }


}

console.log(token)

export function subscribeUser({ user }) {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        console.log('user from subscription')
        console.log(user)
        return
      }
      const userId = user._id
      console.log('user from subscription')
      console.log(user)
      registration.pushManager.getSubscription().then(function (existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
            // userId: user._id
          }).then(function (newSubscription) {
            //TODO: add json token here to get user to backend?
            // const object = newSubscription + token
            console.log('New subscription added.')
      
            console.log('userId from subscription')
            console.log(userId)
            sendSubscription(newSubscription, userId)
          }).catch(function (e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
          console.log('userId from existing subscription')
          console.log(userId)
          sendSubscription(existedSubscription, userId)
        }
      })
    })
      .catch(function (e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}