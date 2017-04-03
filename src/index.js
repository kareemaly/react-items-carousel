import React from 'react';
import ReactDOM from 'react-dom';
import ItemsCarousel from './ItemsCarousel/test';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<ItemsCarousel />, document.getElementById("root"));