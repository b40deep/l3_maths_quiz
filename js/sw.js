//register the service worker onto the website
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log(
          "Service worker registered successfully:",
          registration.scope
        );
      },
      function (err) {
        console.log("Service worker registration failed:", err);
      }
    );
  });
}

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

//receive messages from the website
self.addEventListener("message", function (event) {
  console.log("Received message from web page:", event.data);
});

//cache the static assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static-v1").then(function (cache) {
      return cache.addAll([
        "/index.html",
        // "/styles.css",
        // "/script.js",
        // "/images/logo.png",
      ]);
    })
  );
});
