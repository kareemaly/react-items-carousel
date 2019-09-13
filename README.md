react-items-carousel
---------------

Installing
------------
```
$ npm install react-items-carousel --save
```

[Demos](https://bitriddler.github.io/react-items-carousel/)
--------------

Example
--------------

```javascript
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={2}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: 200, background: '#EEE' }}>First card</div>
        <div style={{ height: 200, background: '#EEE' }}>Second card</div>
        <div style={{ height: 200, background: '#EEE' }}>Third card</div>
        <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
      </ItemsCarousel>
    </div>
  );
};
```

| Property                 | Type                             | Default | Description                                                                           |
|--------------------------|----------------------------------|---------|---------------------------------------------------------------------------------------|
| children *               | node[]                           |         | The cards to render in the carousel. You must specify a height for each card.         |
| numberOfCards            | number                           | 3       | Number of cards to show per slide.                                                    |
| gutter                   | number                           | 0       | Space between cards.                                                                  |
| showSlither              | boolean                          | false   | If true a slither of next card will be shown.                                         |
| firstAndLastGutter       | boolean                          | false   | If true first and last cards will have twice the space.                               |
| enablePlaceholder        | boolean                          | false   | If true, component will render `placeholderItem` until children are passed.           |
| placeholderItem          | node                             | null    | If `enablePlaceholder` is true, this will be rendered until children are passed.      |
| numberOfPlaceholderItems | number                           | 0       | This controls how many `placeholderItem` to render if `enablePlaceholder` is true.    |
| requestToChangeActive *  | function                         |         | This function accepts the new activeItemIndex and should update your component state. |
| activeItemIndex *        | int                              |         | This defines which item should be active.                                             |
| activePosition           | enum ('left', 'center', 'right') | left    | The position of the active item.                                                      |
| rightChevron             | node                             | null    | Right chevron node.                                                                   |
| leftChevron              | node                             | null    | Left chevron node.                                                                    |
| chevronWidth             | number                           | 0       | This value should be the width of left and right chevron.                             |
| outsideChevron           | boolean                          | false   | If true the chevron will be rendered outside the carousel.                            |
| slidesToScroll           | number                           | 1       | Number of cards to scroll when right and left chevrons are clicked.                   |
| disableSwipe             | boolean                          | false   | Disables left and right swiping on touch devices.                                    |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `yarn`
- Run `yarn start:gh`
- Goto `localhost:9000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT