if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let n={};const r=e=>a(e,i),d={module:{uri:i},exports:n,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(t(...e),n)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/143.1fffb475c2bbd2a0.js",revision:"1fffb475c2bbd2a0"},{url:"/_next/static/chunks/152-cb5ffa826d5209ff.js",revision:"cb5ffa826d5209ff"},{url:"/_next/static/chunks/175.34471c6c8aea9296.js",revision:"34471c6c8aea9296"},{url:"/_next/static/chunks/231.5828c547ad8be63c.js",revision:"5828c547ad8be63c"},{url:"/_next/static/chunks/339-57857728d65d54d4.js",revision:"57857728d65d54d4"},{url:"/_next/static/chunks/342.3546c0b602079021.js",revision:"3546c0b602079021"},{url:"/_next/static/chunks/406.ed58b88f12e3897e.js",revision:"ed58b88f12e3897e"},{url:"/_next/static/chunks/412.281aa7fdc9423c1b.js",revision:"281aa7fdc9423c1b"},{url:"/_next/static/chunks/429-5cd3dee719208c94.js",revision:"5cd3dee719208c94"},{url:"/_next/static/chunks/450-92e871398a951974.js",revision:"92e871398a951974"},{url:"/_next/static/chunks/484.f985c6216bce1a81.js",revision:"f985c6216bce1a81"},{url:"/_next/static/chunks/508.29ba6d5e8e8961d2.js",revision:"29ba6d5e8e8961d2"},{url:"/_next/static/chunks/511.553c8a94f4cb33a9.js",revision:"553c8a94f4cb33a9"},{url:"/_next/static/chunks/583.09b633163862fedf.js",revision:"09b633163862fedf"},{url:"/_next/static/chunks/588-26a71e1c33e5cf43.js",revision:"26a71e1c33e5cf43"},{url:"/_next/static/chunks/607.5fd5b753333a169b.js",revision:"5fd5b753333a169b"},{url:"/_next/static/chunks/61-0a312c170850ef4f.js",revision:"0a312c170850ef4f"},{url:"/_next/static/chunks/625.ad5e973a55533d18.js",revision:"ad5e973a55533d18"},{url:"/_next/static/chunks/735.0ad3e2c92909ffd3.js",revision:"0ad3e2c92909ffd3"},{url:"/_next/static/chunks/783-ddfe06262c04babf.js",revision:"ddfe06262c04babf"},{url:"/_next/static/chunks/839-792fbf97520ec9e5.js",revision:"792fbf97520ec9e5"},{url:"/_next/static/chunks/868-4d1133f55c981484.js",revision:"4d1133f55c981484"},{url:"/_next/static/chunks/873-ffdd89069582345d.js",revision:"ffdd89069582345d"},{url:"/_next/static/chunks/895.027ef734721afe36.js",revision:"027ef734721afe36"},{url:"/_next/static/chunks/922.b27b5c618040f980.js",revision:"b27b5c618040f980"},{url:"/_next/static/chunks/928.f49422e44937ce19.js",revision:"f49422e44937ce19"},{url:"/_next/static/chunks/97.c264fd7d21969b28.js",revision:"c264fd7d21969b28"},{url:"/_next/static/chunks/framework-bb5c596eafb42b22.js",revision:"bb5c596eafb42b22"},{url:"/_next/static/chunks/main-b82373b7e58f0be5.js",revision:"b82373b7e58f0be5"},{url:"/_next/static/chunks/pages/404-7e7d2b0b4925247d.js",revision:"7e7d2b0b4925247d"},{url:"/_next/static/chunks/pages/_app-08ab18f6cdef6e9b.js",revision:"08ab18f6cdef6e9b"},{url:"/_next/static/chunks/pages/_error-0509152792d2b207.js",revision:"0509152792d2b207"},{url:"/_next/static/chunks/pages/authentication-3aeecf9946ddcc10.js",revision:"3aeecf9946ddcc10"},{url:"/_next/static/chunks/pages/category/%5Bid%5D-699a33e1688a93ae.js",revision:"699a33e1688a93ae"},{url:"/_next/static/chunks/pages/category/%5Bid%5D/%5BproductId%5D-ea471c516c465ebb.js",revision:"ea471c516c465ebb"},{url:"/_next/static/chunks/pages/change-password-ad98355f5abbfa5e.js",revision:"ad98355f5abbfa5e"},{url:"/_next/static/chunks/pages/index-aa1172ff35285453.js",revision:"aa1172ff35285453"},{url:"/_next/static/chunks/pages/login-07a8ba76c72e87ef.js",revision:"07a8ba76c72e87ef"},{url:"/_next/static/chunks/pages/privacy-policy-13111b0a17f2e33b.js",revision:"13111b0a17f2e33b"},{url:"/_next/static/chunks/pages/product/%5Bid%5D-96f794140962dd83.js",revision:"96f794140962dd83"},{url:"/_next/static/chunks/pages/profile-190dfba14a175f41.js",revision:"190dfba14a175f41"},{url:"/_next/static/chunks/pages/profile/edit-66ca24cd79b26732.js",revision:"66ca24cd79b26732"},{url:"/_next/static/chunks/pages/reset-password-42d2fe8db3dba4c3.js",revision:"42d2fe8db3dba4c3"},{url:"/_next/static/chunks/pages/search-de6f8e912559a7fe.js",revision:"de6f8e912559a7fe"},{url:"/_next/static/chunks/pages/term-of-use-8ce762d9c6cc52ae.js",revision:"8ce762d9c6cc52ae"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-57b3728ce595810b.js",revision:"57b3728ce595810b"},{url:"/_next/static/css/02c57f616fbbf0fa.css",revision:"02c57f616fbbf0fa"},{url:"/_next/static/css/05157f56fb9bf3ee.css",revision:"05157f56fb9bf3ee"},{url:"/_next/static/css/156647e119735265.css",revision:"156647e119735265"},{url:"/_next/static/css/22ae26019ec44525.css",revision:"22ae26019ec44525"},{url:"/_next/static/css/6297ef222d1a3cc4.css",revision:"6297ef222d1a3cc4"},{url:"/_next/static/css/62a2b8cf6cacdd2f.css",revision:"62a2b8cf6cacdd2f"},{url:"/_next/static/css/6acdda7e9100e35b.css",revision:"6acdda7e9100e35b"},{url:"/_next/static/css/738583cce8884f21.css",revision:"738583cce8884f21"},{url:"/_next/static/css/7b46f010dc991fc2.css",revision:"7b46f010dc991fc2"},{url:"/_next/static/css/7c4077d79913bb75.css",revision:"7c4077d79913bb75"},{url:"/_next/static/css/92dacce74d8219d0.css",revision:"92dacce74d8219d0"},{url:"/_next/static/css/9499fd76ed15df6b.css",revision:"9499fd76ed15df6b"},{url:"/_next/static/css/a64a62358efae64a.css",revision:"a64a62358efae64a"},{url:"/_next/static/css/aeb464aaac0a940d.css",revision:"aeb464aaac0a940d"},{url:"/_next/static/css/c7a971a7ddb01eb0.css",revision:"c7a971a7ddb01eb0"},{url:"/_next/static/fLAZYaBTi93FGshb4SruA/_buildManifest.js",revision:"6a27103ca5b185f279016ca949048962"},{url:"/_next/static/fLAZYaBTi93FGshb4SruA/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/fLAZYaBTi93FGshb4SruA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/WBT.22fddfdb.png",revision:"087839cf079ebeccb83bf1dcbe63fa78"},{url:"/_next/static/media/WBT3.091514d9.png",revision:"4a0ba150dce4ef9575289a1b8a13c0a6"},{url:"/_next/static/media/affiliate.af0cbade.jpg",revision:"11d63e0cecc6883e30e27b6d8a378b0d"},{url:"/_next/static/media/bunny-mono.dac56c4f.png",revision:"4ecbd10aa7b280510a042400552699b9"},{url:"/_next/static/media/crypto.476f22af.jpg",revision:"307e4d929fdd92e3069822dba7863e57"},{url:"/_next/static/media/default_user_image.bbf80641.png",revision:"2a2e8a0bfb803ef8008f99153d92090d"},{url:"/_next/static/media/ico.3beffee1.jpg",revision:"18893bae3b3dc8dce8377e68aa034d35"},{url:"/_next/static/media/insurance.01f7156c.jpg",revision:"790aa5812c1b369c57571e43d99cf020"},{url:"/_next/static/media/logo.7ef032d7.png",revision:"9f2f98f38274cd69274c8374efb307d2"},{url:"/_next/static/media/metamask-3.7dc863fe.png",revision:"2af84e2a17fbcd6f22fcbef5c526f453"},{url:"/_next/static/media/metamask.b2478938.png",revision:"81ad37d2252e5eadb24b02cce82af2f1"},{url:"/_next/static/media/metaverse.7bb361b8.jpg",revision:"7fa63c5f4baedd21a170e30d490254e8"},{url:"/_next/static/media/nft.3284dd70.jpg",revision:"6b3dc059f7b521eefd8209a7722e740b"},{url:"/favicon.ico",revision:"705e519afc8a05adeb40f7b030e6e574"},{url:"/manifest.json",revision:"a25cf45199bb876692e0afa58e70e0aa"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"/wbt.png",revision:"4a0ba150dce4ef9575289a1b8a13c0a6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
