import $ from 'jquery';

const Gallery = function (element) {
  const $gallery = $(element);
  const $slidesContainer = $gallery.find('.cs-gallery__slides-container');
  const $slides = $gallery.find('.cs-gallery__slide');
  const $prevBtn = $gallery.find('.js-prev-btn');
  const $nextBtn = $gallery.find('.js-next-btn');
  const $currentNumber = $gallery.find('.cs-gallery__current-number');
  const $totalNumber = $gallery.find('.cs-gallery__total-number');
  let currentIndex = 0;

  const init = function () {
    $currentNumber.text(currentIndex + 1);
    $totalNumber.text($slides.length);
    bind();
  };

  const bind = function () {
    $prevBtn.click((e) => {
      e.preventDefault();
      prevSlide();
    });

    $nextBtn.click((e) => {
      e.preventDefault();
      nextSlide();
    });
  };

  const prevSlide = function () {
    goToSlide(currentIndex - 1);
  };

  const nextSlide = function () {
    goToSlide(currentIndex + 1);
  };

  const goToSlide = function (index) {
    // update the index
    currentIndex = index;

    // go to first slide if past the end
    if (currentIndex > $slides.length - 1) {
      currentIndex = 0;
    }

    // go to last slide if past the beginning
    if (currentIndex < 0) {
      currentIndex = $slides.length - 1;
    }

    // update current text
    $currentNumber.text(currentIndex + 1);

    // move the slides
    $slidesContainer.css('transform', `translateX(-${currentIndex * 100}%)`);
  };

  init();
};

export default Gallery;
