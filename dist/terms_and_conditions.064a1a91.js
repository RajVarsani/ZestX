parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"b4cl":[function(require,module,exports) {
let e=document.getElementsByClassName("scrolling_terms_condition_content"),t=document.getElementsByClassName("terms_conditon_landing"),n=document.getElementById("terms-and-conditon"),o=document.getElementById("privacy-policy"),i=document.getElementById("cookie-policy"),c=0,s=0,d=new URL(location.href),l=window.location.href.toString().split("/")[3];"privacypolicy"==l&&(s=1),"cookiepolicy"==l&&(s=2),1!=s&&2!=s||t[s].scrollIntoView({behavior:"smooth"});for(let m=0;m<e.length;m++)e[m].addEventListener("click",()=>{t[m].scrollIntoView({behavior:"smooth"})});function a(e){switch(e){case 0:n.classList.remove("scrolling_terms_condition_content_active");break;case 1:o.classList.remove("scrolling_terms_condition_content_active");break;case 2:i.classList.remove("scrolling_terms_condition_content_active")}}function r(e){switch(e){case 0:n.classList.add("scrolling_terms_condition_content_active");break;case 1:o.classList.add("scrolling_terms_condition_content_active");break;case 2:i.classList.add("scrolling_terms_condition_content_active")}}window.addEventListener("scroll",()=>{let e=window.innerHeight;window.pageYOffset<=t[1].offsetTop-e/2?0!=c&&(c=0,r(0),a(1),a(2)):window.pageYOffset<=t[2].offsetTop-e/2?1!=c&&(r(c=1),a(0),a(2)):window.pageYOffset>t[2].offsetTop-e/2&&2!=c&&(r(c=2),a(1),a(3))}),setTimeout(function(){let e,t=document.getElementById("Progressbar"),n=window.innerWidth,o=n-100,i=n-20,c=[50,15,60],s=[50,15,60],d=[250,155,160];function l(){e=document.body.scrollHeight-window.innerHeight;let n=window.pageYOffset/e*100;t.style.height=n+"%",function(e){for(let t=0;t<c.length;t++)c[t]=s[t]+e*d[t]}(window.pageYOffset/e)}l(),window.onscroll=function(){l()};var a=0;let r=!1;function m(e){o=n-200,i=n-20,e.clientX>i&&(r=!0,u(e))}function w(e){r=!1}function u(t){r&&t.clientX>o&&(a=t.clientY,window.scrollBy(0,(a*e/window.innerHeight-window.pageYOffset)/10))}document.addEventListener("mousedown",m),document.addEventListener("touchstart",m),document.addEventListener("mousemove",u),document.addEventListener("touchmove",u),document.addEventListener("mouseleave",w),document.addEventListener("mouseup",w),document.addEventListener("touchend",w)},200);
},{}]},{},["b4cl"], null)
//# sourceMappingURL=/terms_and_conditions.064a1a91.js.map