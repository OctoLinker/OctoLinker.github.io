$(function(){
  "use strict";
  smoothScroll.init({
    offset: $('nav').outerHeight() + 20
  });

  initInstallButton();

  $('[data-toggle="tooltip"]').tooltip();
});

function showNotAvailable() {
  var $notAvailable = $('<span class="not-available">Sorry, the OctoLinker isn\'t available for your browser.<br/>We currently support </span>')
    .append($('.install-chrome').removeClass('grey-link')).append(', ')
    .append($('.install-firefox').removeClass('grey-link')).append(' and ')
    .append($('.install-opera').removeClass('grey-link')).append('.')

  $('#install .center').html($notAvailable);
  $('.header-content--small').empty();
}

function updateInstallButton(browserName, url) {
  var $installButton = $('#install-button');
  var $installNote = $('#install-note');

  $installButton.text('Install for ' + browserName);
  $installButton.attr('href', url);

  $installNote.text('Also available for');
  $('<span>and </span>').insertBefore($('.header-content--small a:last'));
}

function initInstallButton() {
  var browserName = $.browser.name;
  if (browserName === 'mozilla') browserName = 'firefox'
  var $link = $('.install-' + browserName);

  if($link.length) {
    updateInstallButton(browserName, $link.attr('href'));
    $link.remove();
    return;
  }

  showNotAvailable();
}
