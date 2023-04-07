const {PriceGetter} = require('./price_getter')

function timeout(ms) { //pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function example(){
  let bitcoin = await PriceGetter.get24hrPercentageChange("BTC", "USD");
  let ethereum = await PriceGetter.get24hrPercentageChange("ETH", "USD");
  console.log(`Bitcoin 24hr Change: ${bitcoin}`);
  console.log(`Ethereum 24hr Change: ${ethereum}`);
  await timeout(6000);
  bitcoin = await PriceGetter.get24hrPercentageChange("BTC", "USD");
  ethereum = await PriceGetter.get24hrPercentageChange("ETH", "USD");
  console.log(`Bitcoin 24hr Change: ${bitcoin}`);
  console.log(`Ethereum 24hr Change: ${ethereum}`);
}

example();
