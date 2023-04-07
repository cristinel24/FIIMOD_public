# Crypto Price Getter
## Installation
```
npm install crypto-price-getter
```
## Un-installation
```
npm un crypto-price-getter
```

## Usage
## Reference
All the asset and base pairs can be found in the `asset_base_pairs.txt` file
### Import
```
const {PriceGetter} = require('crypto-price-getter')
```

### Getting Latest Trade Price
```
await PriceGetter.getLatestTradePrice("BTC", "USD")
await PriceGetter.getLatestTradePrice("ETH", "USD")
```

### Getting 24hr Price Stats
```
await PriceGetter.get24hrStats("BTC", "USD")
await PriceGetter.get24hrStats("ETH", "USD")
```

### Get 24hr Price Percentage Change
```
await PriceGetter.get24hrPercentageChange("BTC", "USD")
await PriceGetter.get24hrPercentageChange("ETH", "USD")
```
