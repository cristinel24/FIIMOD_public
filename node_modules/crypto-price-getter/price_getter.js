const axios = require('axios');

let API_BASE_OPTIONS = {
  method: 'GET',
  url: 'https://api.pro.coinbase.com'
}

class PriceGetter {
  static async get24hrStats(asset, base){
    const options = {
      asset: asset,
      base: base,
      request_type: "stats"
    }
    const stats = await this.sendRequest(options)
    return stats
  }

  static async getLatestTradePrice(asset, base){
    const options = {
      asset: asset,
      base: base,
      request_type: "ticker"
    }
    const latestPriceInfo = await this.sendRequest(options)
    const latestPrice = parseFloat(latestPriceInfo["price"])
    return latestPrice
  }

  static async get24hrPercentageChange(asset, base){
    const stats = await this.get24hrStats(asset, base);
    const openingPrice = parseFloat(stats["open"])
    const latestPrice = await this.getLatestTradePrice(asset, base);
    return this.percentageChange(openingPrice, latestPrice)

  }

  // Private

  // Sends HTTP request to the Coinbase REST API
  // Return value is the requested information in JSON form
  // If there is an error the return value is 'undefined'
  static async sendRequest(options){
    const request_options = this.formatRequest(options)
    const res = await axios.request(request_options);

    return res.data
  }

  // Takes options and api server credentionals and formats them into HTTP options
  static formatRequest(options) {
    const asset = options["asset"];
    const base = options["base"];
    const data_type = options["request_type"];
    const product_id = `${asset}-${base}`;
    const path = `/products/${product_id}/${data_type}`;

    let request_options = {...API_BASE_OPTIONS};
    request_options["url"] += path;
    return request_options
  }

  // Calculates percentage change between two values
  static percentageChange(oldPrice, newPrice){
    const change = newPrice - oldPrice;
    const percentage = (((oldPrice + change)/oldPrice) - 1) * 100;
    return Math.round(percentage * 100) / 100
  }
}

module.exports = {PriceGetter}
exports.price_getter = PriceGetter
