const { LoginPage } = require('./LoginPage/LoginPage');
const { ProductsPage } = require('./ProductsPage/ProductsPage');
const { Helpers } = require('./Helpers/Helpers');
const { standartUser } = require('./TestData/users');
const { env } = require('./TestData/env');

module.exports = {
    LoginPage,
    ProductsPage,
    Helpers,
    standartUser,
    env
}