# beer-calc

> Calculations for brewing beer.

## Install

```
$ yarn add beer-calc
```

## Usage

```js
const beerCalc = require('beer-calc');

beerCalc('unicorns');
```

## API

Calculations for brewing beer.

### beerCalc.SRM([grains], batchSize)

Returns the SRM Color estimate for a recipe given an array of grain objects and the batch size in gallons.
The grain object has two properties, L (degrees Lovibond) and Lbs (weight of grain in pounds).

example:

```javascript
const SRM = beerCalc.SRM([{ L: 20, Lbs: 4 }, { L: 8, Lbs: 6 }], 5);
// returns 26.319359999999996
```

## License

[MIT](./LICENSE)
