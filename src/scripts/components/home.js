import $ from 'jquery';
import Slider from './common/Slider';
import Grid from './common/Grid';

const $window = $(window);

// init scroll down button
// ----------------------------------------- //
$('.scroll-down-btn').click((e) => {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $window.height()
  }, 500, 'easeInOutQuad');
});

// init sliders
// ----------------------------------------- //
$('.slider').each((i, el) => {
  const thisSlider = new Slider(el);
});

// init grids
// ----------------------------------------- //
$('.grid').each((i, el) => {
  const thisGrid = new Grid(el);
});

// leadership
// ----------------------------------------- //
const $body = $('html, body');
const $leadershipSection = $('.leadership');
const $leaderLinks = $('.leader__link');
const $biosSection = $('.bios');
const $navLinks = $('.bios__nav-link');
const $bios = $('.bio');

$leaderLinks.each((i, el) => {
  const $el = $(el);

  $el.click((e) => {
    e.preventDefault();
    openBio($el.attr('href').replace('#', ''));
  });
});

$navLinks.each((i, el) => {
  const $el = $(el);

  $el.click((e) => {
    e.preventDefault();
    openBio($el.attr('href').replace('#', ''));
  });
});

$('.bios__close-btn').click((e) => {
  e.preventDefault();
  closeBio();
});

const openBio = function (id) {
  $leadershipSection.addClass('is-open');
  $biosSection.addClass('is-open');

  const offset = $biosSection.offset().top + 2;

  $body.animate({
    scrollTop: offset
  }, 500, 'easeInOutQuad');

  $bios.each((i, el) => {
    const $el = $(el);
    if ($el.attr('id') === id) {
      $el.addClass('is-current');
    } else {
      $el.removeClass('is-current');
    }
  });

  $navLinks.each((i, el) => {
    const $el = $(el);
    if ($el.attr('href').replace('#', '') === id) {
      $el.addClass('is-current');
    } else {
      $el.removeClass('is-current');
    }
  });
};

const closeBio = function () {
  $leadershipSection.removeClass('is-open');
  $biosSection.removeClass('is-open');
};

