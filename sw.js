var C='attin-v2',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var q=e.request;if(q.method!=='GET')return;
  e.respondWith(caches.match(q,{ignoreSearch:true}).then(function(m){
    var net=fetch(q).then(function(r){if(r&&(r.ok||r.type==='opaque')){var c=r.clone();caches.open(C).then(function(x){x.put(q,c)})}return r}).catch(function(){return null});
    if(m){e.waitUntil(net);return m}
    return net.then(function(r){return r||(q.mode==='navigate'?caches.match('./index.html'):Response.error())});
  }));
});
