const shopify = require('shopify-api-node');
require('dotenv').config();
const { SHOP_NAME, API_KEY, ACCESS_TOKEN } = process.env;

const client = new shopify({
  shopName: SHOP_NAME,
  apiKey: API_KEY,
  password: ACCESS_TOKEN,
});

module.exports = client;