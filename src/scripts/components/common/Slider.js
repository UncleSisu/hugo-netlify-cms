import $ from 'jquery';

const Slider = function (element) {
  const $slider = $(element);
  const $slidesContainer = $slider.find('.slider__slides-container');
  const $slides = $slider.find('.slider__slide');
  const $nextBtn = $slider.find('.js-next-btn');
  const $lastBtn = $slider.find('.js-last-btn');
  const $nextNumber = $slider.find('.slider__next-number');
  const $pagination = $slider.find('.slider__page-btn');
  let currentIndex = 0;

  const init = function () {
    bind();
  };

  const bind = function () {
    $pagination.each((i, el) => {
      $(el).click((e) => {
        e.preventDefault();
        goToSlide(i);
      });
    });

    $nextBtn.click((e) => {
      e.preventDefault();
      nextSlide();
    });

    $lastBtn.click((e) => {
      e.preventDefault();
      goToSlide(0);
    });
  };

  const nextSlide = function () {
    goToSlide(currentIndex + 1);
  };

  const goToSlide = function (index) {
    // update the index
    currentIndex = index;

    // update next button
    $nextNumber.text(currentIndex + 2);

    // move the slides
    $slidesContainer.css('transform', `translateX(-${index * 100}%)`);

    // check if we are on the last slide
    if (currentIndex + 1 >= $slides.length) {
      $slider.addClass('is-at-end');
    } else {
      $slider.removeClass('is-at-end');
    }

    // update the pagination
    $pagination.each((i, el) => {
      const $el = $(el);

      if (i === currentIndex) {
        $el.addClass('is-current');
      } else {
        $el.removeClass('is-current');
      }
    });
  };

  init();
};

export default Slider;
