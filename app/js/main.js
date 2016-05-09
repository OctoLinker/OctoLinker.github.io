'use strict';

console.log(chrome.app.isInstalled);

if (chrome.app.isInstalled) {
  document.getElementById('install-button').style.display = 'none';
  console.log('is installed');
}
