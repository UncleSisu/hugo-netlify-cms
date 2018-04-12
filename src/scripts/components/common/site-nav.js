import $ from 'jquery';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import postal from 'postal';
import Section from './Section';
import { NAV_HEIGHT, HOME_CHANNEL } from '../../constants/Constants';

const channel = postal.channel(HOME_CHANNEL);
const $window = $(window);
const $body = $('html, body');
const $mask = $('.site-container__mask');
const $siteNav = $('.site-nav');
const $menuBtn = $('.menu-btn');
const $links = $('.js-nav-link');
const $siteSections = $('.js-site-section');
let windowHeight = $window.height();
let isSticky = false;

// init
// ----------------------------------------- //
const init = function () {
  // build site sections
  if ($siteSections.length > 0) {
    $siteSections.each((i, el) => {
      const newSection = new Section(el);
    });
  }

  checkNavPosition();
  checkWindowSize();
  checkScrollPosition();
  bind();
};

// bind
// ----------------------------------------- //
const bind = function () {
  $menuBtn.click((e) => {
    e.preventDefault();
    openNav();
  });

  $mask.click((e) => {
    e.preventDefault();
    closeNav();
  });

  $links.each((i, el) => {
    const $el = $(el);
    const id = $el.attr('href');

    $el.click((e) => {
      e.preventDefault();
      scrollToSection(id);
    });
  });

  $window.on('scroll', () => {
    checkNavPosition();
  });

  $window.on('scroll', throttle(() => {
    checkScrollPosition();
  }, 100));

  $window.on('resize', debounce(() => {
    checkWindowSize();
  }, 300));

  channel.subscribe('section.isCurrent', (id) => {
    makeSectionCurrent(id);
  });
};

// methods
// ----------------------------------------- //
const openNav = function () {
  $body.addClass('has-open-nav');
};

const closeNav = function () {
  $body.removeClass('has-open-nav');
};

const checkNavPosition = function () {
  if ($window.scrollTop() > windowHeight - NAV_HEIGHT) {
    if (isSticky === false) {
      isSticky = true;
      $siteNav.addClass('is-sticky');
    }
  } else if (isSticky) {
    isSticky = false;
    $siteNav.removeClass('is-sticky');
  }
};

const checkWindowSize = function () {
  windowHeight = $window.height();

  channel.publish('window.resize');
};

const checkScrollPosition = function () {
  channel.publish('window.scroll', $window.scrollTop());
};

const scrollToSection = function (id) {
  closeNav();

  $body.animate({
    scrollTop: $(id).offset().top + 1
  }, 500, 'easeInOutQuad');
};

const makeSectionCurrent = function (id) {
  $links.each((i, el) => {
    const $el = $(el);
    if (id === $el.attr('href').replace('#', '')) {
      $el.addClass('is-current');
    } else {
      $el.removeClass('is-current');
    }
  });
};

init();
