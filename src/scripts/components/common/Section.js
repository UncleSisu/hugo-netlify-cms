import $ from 'jquery';
import postal from 'postal';
import { HOME_CHANNEL } from '../../constants/Constants';

const channel = postal.channel(HOME_CHANNEL);
let isCurrent = false;

const Section = function (element) {
  const $section = $(element);
  const id = $section.attr('id');
  let top = 0;
  let bottom = 0;

  channel.subscribe('window.resize', () => {
    getTopAndBottom();
  });

  channel.subscribe('grid.resize', () => {
    getTopAndBottom();
  });

  channel.subscribe('window.scroll', (scrollTop) => {
    if (scrollTop >= top && scrollTop <= bottom) {
      channel.publish('section.isCurrent', id);
    }
  });

  const getTopAndBottom = function () {
    top = $section.offset().top;
    bottom = top + $section.outerHeight(true);
  };
};

export default Section;
