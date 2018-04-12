import $ from 'jquery';
import postal from 'postal';
import { HOME_CHANNEL } from '../../constants/Constants';

const channel = postal.channel(HOME_CHANNEL);
const $internalNav = $('.internal-nav');
const offset = 5; // how far to scroll before resizing header
let hasScrolled = false;

const checkScrollPosition = function (scrollTop) {
  if (scrollTop >= offset) {
    if (hasScrolled === false) {
      hasScrolled = true;
      $internalNav.addClass('is-compact');
    }
  } else if (hasScrolled) {
    hasScrolled = false;
    $internalNav.removeClass('is-compact');
  }
};

// listen for window scroll
channel.subscribe('window.scroll', (scrollTop) => {
  checkScrollPosition(scrollTop);
});

// check the first time the page loads
checkScrollPosition($(window).scrollTop());
