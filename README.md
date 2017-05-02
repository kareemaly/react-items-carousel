react-items-carousel
---------------

Installing
------------
```
$ npm install react-items-carousel --save
```

[Demos](http://bitriddler.com/playground/items-carousel)
--------------

Example
--------------

```javascript
import React from 'react';
import ItemsCarousel from 'react-items-carousel';

export default class Test extends React.Component {
  createSlideItem(number) {
    return (
      <div style={{ height: 200, background: '#333' }}>{number}</div>
    );
  }

  render() {
    return (
      <ItemsCarousel canCenterOne={false} firstItemGutter={24} lastItemGutter={24} gutter={12} numberOfCards={2}>
        {this.createSlideItem(1)}
        {this.createSlideItem(2)}
        {this.createSlideItem(3)}
        {this.createSlideItem(4)}
        {this.createSlideItem(5)}
        {this.createSlideItem(6)}
        {this.createSlideItem(7)}
      </ItemsCarousel>
    );  
  }
} 
```



| Property | Type | Default | Description |
| --- | --- | --- | --- |
| resistanceCoeffiecent | number | 0.5 | Use this to control the resistance when the user release the swipe<br />More resistance means the slider will take shorter path to stop
@type {number} |
| springConfig | shape (stiffness, precision, damping) | presets.noWobble |  |
| children* | array |  |  |
| disableScrolling | bool |  |  |
| freeScrolling | bool |  |  |
| safeMargin | number | 100 | Safe margin to use<br />@type {number} |
| gutter | number | 0 | Gutter between items<br />@type {number} |
| initialTranslation | number | 0 | This is particallary not useful<br />@ignore
@type {number} |
| numberOfCards | number | 3.5 | Define the number of cards to show<br />@type {number} |
| firstItemGutter | number | 0 | Define the gutter of the first item<br />@type {number} |
| lastItemGutter | number | 0 | Define the gutter of the last item<br />@type {number} |
| centeredItemIndex | number | 0 | This gives control to change the centeredItemIndex from outside<br />If this is given then you should update it by listening onCenteredItemChange
@type {number} |
| onCenteredItemChange | func |  | This is called when the centered item index change<br />@type {func} |
| canCenterOne | bool | true | If this is true then when two items are greater than the container width then<br />it will center one item
@type {bool} |
| enableAppShell | bool | true |  |
| appShellItem | element |  |  |
| minimumAppShellTime | number | 0 |  |
| numberOfShellItems | number | 4 |  |
| rightChevron | element |  |  |
| leftChevron | element |  |  |
| chevronWidth | number |  |  |
| outsideChevron | bool |  |  |
| slidesToScroll | number |  |  |
| centerExactly | bool | false |  |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT
