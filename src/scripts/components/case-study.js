import $ from 'jquery';
import Gallery from './common/Gallery';

// init galleries
// ----------------------------------------- //
$('.cs-gallery').each((i, el) => {
  const thisGallery = new Gallery(el);
});
