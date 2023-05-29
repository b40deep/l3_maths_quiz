//installing and activating the sw
self.addEventListener("install", function (event) {
  console.log("Service worker installed successfully");
});

self.addEventListener("activate", function (event) {
  console.log("Service worker activated successfully");
});

//intercept and handle fetch requests made by your app
self.addEventListener("fetch", function (event) {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("Found in cache:", event.request.url);
        return response;
      }
      console.log(
        "Not found in cache, fetching from network:",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

//receive messages from the website - you'd use this to get data straight from your pages
self.addEventListener("message", function (event) {
  data = event.data;
  // console.log("Received message from web page:", data);
  // console.log("data:", data["username"]);
  // caches.open("static-v1").then(function (cache) {
  //   return cache.put("username", data["username"]);
  // });
});

//cache the static assets so you app can work offline
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static-v1").then(function (cache) {
      return cache.addAll([
        "./",
        "/index.html",
        "/game.html",
        "/images/logo128.png",
        "/images/logo256.png",
        "/images/logo512.png",
        "/images/logo96.png",
        "/images/game/-.png",
        "/images/game/+.png",
        "/images/game/d.png",
        "/images/game/x.png",
        "/images/game/1.png",
        "/images/game/2.png",
        "/images/game/3.png",
        "/images/game/4.png",
        "/images/game/5.png",
        "/images/game/6.png",
        "/images/game/7.png",
        "/images/game/8.png",
        "/images/game/9.png",
        "/images/game/10.png",
        "/images/game/11.png",
        "/images/game/12.png",
        "/images/game/bg.png",
        "/images/game/fail1.png",
        "/images/game/fail2.png",
        "/images/game/fail3.png",
        "/images/game/fail4.png",
        "/images/game/pass1.png",
        "/images/game/pass2.png",
        "/images/game/pass3.png",
        "/images/game/pass4.png",
        "/images/game/temp.png",
        "/images/game/bgSoundtrue.png",
        "/images/game/bgSoundfalse.png",
        "/css/bootstrap.min.css",
        "/css/custom.css",
        "/js/bootstrap.min.js",
        "/js/camera.js",
        "/js/index.js",
        "/js/maths.js",
        "/js/sound.js",
        "/sound/fail.mp3",
        "/sound/pass.mp3",
        "/sound/bg.mp3",
        "/font/comic.ttf",
      ]);
    })
  );
});
