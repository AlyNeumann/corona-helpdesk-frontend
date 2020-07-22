

const cacheName = 'v2'
const CACHE = 'cache-update-and-refresh';

const cacheAssests = [
    'index.html',
    'manifest.json'
    //TODO: list the index.html & chunks from build folder once built
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log("Serve Worker Caching Files")
            cache.addAll(cacheAssests)
            .then(() => {
                self.skipWaiting()
            })
        })
    )
})

self.addEventListener('activate', e => {
    console.log('service worker activated')
    //remove unwanted caches 
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('service worker clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//call fetch event - this is for caching only specific files
self.addEventListener('fetch', e => {
    console.log('service worker fetching')
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})

//TODO: decide - this is for caching ALL, in which case, you don't need to define cache assests above
//if using this, remove other fetch & cache assests & caching from install functions
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    )
})

//update and refresh cache
if('servicWorker' in navigator) {
    navigator.serviceWorker.onmessage = function (evt) {
        const message = JSON.parse(evt.data);
        const isRefresh = message.type === 'refresh';
        const isAsset = message.url.includes('asset');
        const lastETag = localStorage.currentETag;

        const isNew = lastETag !== message.eTag;

        if( isRefresh && isAsset && isNew) {
            if(lastETag) {
                notice.hidden = false;
            }
            localStorage.currentETag = message.eTag;

        }
    };
    const notice = document.querySelector('#update-notice');

    const update = document.querySelector('#update');
    update.onclick = function(evt) {
        const img = document.querySelector(img);
        evt.preventDefault();

        caches.open(CACHE)

        .then(function(cache) {
            return cache.match(img.src);
        })
        .then(function(response) {
            return response.blob();
        })
        .then(function(bodyBlob){
            console.log('service worker refreshing')
            const url = URL.createObjectURL(bodyBlob);
            img.src = url;
            notice.hidden = true;
        });
    };
}

self.addEventListener('push', event => {

    '../src/Assets/CCH_white_textlogo.png'
   
    const data = event.data.json()
    console.log(JSON.stringify(data))
    const notifIcon = './covid_icon.png'
    const notifImg = './CCH_white_textlogo.png'
  
    console.log('New notification', data)
    const options = {
      body: data.body,
      icon: notifIcon,
    //   image: notifImg,
      badge: notifImg
    }
    console.log(options)
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })
  