import merge from 'lodash/merge';

const mainState = {
  noOfChildren: 10,
  wrapperStyle: { padding: "0 60px", maxWidth: 800, margin: '0 auto' },
  componentProps: {
    infiniteLoop: false,
    gutter: 12,
    activePosition: 'center',
    chevronWidth: 60,
    disableSwipe: false,
    alwaysShowChevrons: false,
  },
};

const getState = (override = {}) => merge({}, mainState, override);

export default [
  {
    name: 'Centered',
    state: getState({
      componentProps: {
        numberOfCards: 2,
        slidesToScroll: 2,
        outsideChevron: true,
        showSlither: false,
        firstAndLastGutter: false,
      },
    }),
  },
  {
    name: 'Centered with slither',
    state: getState({
      componentProps: {
        numberOfCards: 2,
        slidesToScroll: 2,
        outsideChevron: true,
        showSlither: true,
        firstAndLastGutter: true,
      },
    }),
  },
  {
    name: 'Full',
    state: getState({
      wrapperStyle: { padding: 0, maxWidth: '100%', margin: '0' },
      componentProps: {
        numberOfCards: 3,
        slidesToScroll: 3,
        outsideChevron: false,
        showSlither: false,
        firstAndLastGutter: false,
      },
    }),
  },
  {
    name: 'Full with outside gutter',
    state: getState({
      wrapperStyle: { padding: 0, maxWidth: '100%', margin: '0' },
      componentProps: {
        numberOfCards: 3,
        slidesToScroll: 3,
        outsideChevron: false,
        showSlither: false,
        firstAndLastGutter: true,
      },
    }),
  },
  {
    name: 'One',
    state: getState({
      componentProps: {
        numberOfCards: 1,
        slidesToScroll: 1,
        outsideChevron: false,
        showSlither: true,
        firstAndLastGutter: true,
      },
    }),
  },
];