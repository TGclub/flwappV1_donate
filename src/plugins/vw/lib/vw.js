const win = window
const _baseFontSize = 100;
const _psdWidth = 750;
const doc = win.document;
const ua = navigator.userAgent;
const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
const isIOS = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
const dpr = win.devicePixelRatio || 1;
const docElement = doc.documentElement;

let rate = 1;
let scale = 1 / dpr;

if (!isIOS && matches) {
  docElement.style.fontSize = _baseFontSize + 'px';
  var div = doc.createElement('div');
  div.setAttribute('style', 'width: 1rem;display:none');
  docElement.appendChild(div);
  var trueWidth = win.getComputedStyle(div).width;
  docElement.removeChild(div);
  if (trueWidth !== docElement.style.fontSize) {
    var trueWidthVal = parseInt(trueWidth, 10);
    rate = _baseFontSize / trueWidthVal;
    scale = scale * rate;
  }
} else {
  scale = 1;
}

const metaEl = doc.querySelector('meta[name="viewport"]');
if (!metaEl) {
  metaEl = doc.createElement('meta');
  metaEl.setAttribute('name', 'viewport');
  doc.head.appendChild(metaEl);
}
metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

const setFontSize = function setFontSize() {
  docElement.style.fontSize = _baseFontSize / _psdWidth * docElement.clientWidth * rate + 'px';
};
setFontSize();
win.addEventListener('resize', setFontSize);
