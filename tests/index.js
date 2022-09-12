const assert = require('assert');
const should = require('chai').should();
const { LoginPage, Helpers, ProductsPage, env, standartUser } = require('pom-endava');

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const helpers = new Helpers();
const { username, password } = standartUser



describe('Scenario 1', () => {
    after(function () {
        helpers.driver.quit()
    });

    it('Log in with the standard user', async () => {
        // Log into Swag Labs with standart user
        await loginPage.login(helpers, env.url, username, password)

        // Assert correct title after login
        const title = await helpers.getElementText(loginPage.title)
        title.should.equal('PRODUCTS')
    });

    it('Add the first and the last item in the cart, verify the correct items are added', async () => {

        // Log into Swag Labs with standart user
        await loginPage.login(helpers, env.url, username, password)

        // Add first item
        await productsPage.addProducts(helpers, 'firstElement', 1)
        await productsPage.addProducts(helpers, 'lastElement', 1)

        // verify the correct items are added
        await productsPage.goToCart(helpers)
        let cartItemsCount = await productsPage.countCartItems(helpers)
        await cartItemsCount.should.eq(2)

        const [firstCartItem, lastCartItem] = await helpers.getElementsText(productsPage.cartItemTitle)
        firstCartItem.should.equal('Sauce Labs Backpack')
        lastCartItem.should.equal('Test.allTheThings() T-Shirt (Red)')
    });

    it('Remove the first item and add previous to the last item to the cart, verify the content again', async () => {
        // Log into Swag Labs with standart user
        await loginPage.login(helpers, env.url, username, password)

        // verify the correct items are added
        await productsPage.goToCart(helpers)

        const [firstCartItem, lastCartItem] = await helpers.getElementsText(productsPage.cartItemTitle)
        firstCartItem.should.equal('Sauce Labs Backpack')
        lastCartItem.should.equal('Test.allTheThings() T-Shirt (Red)')

        // Remove first item
        await productsPage.removeCartItem(helpers, 1)
        let cartItemsCount = await productsPage.countCartItems(helpers)
        await cartItemsCount.should.eq(1)

        // Add previous to the last item to the cart
        await productsPage.goToProducts(helpers)
        await productsPage.addProducts(helpers, 'fromEnd', 2)

        await productsPage.goToCart(helpers)

        cartItemsCount = await productsPage.countCartItems(helpers)
        await cartItemsCount.should.eq(2)
        const [updatedFirstCartItem, updatedLastCartItem] = await helpers.getElementsText(productsPage.cartItemTitle)
        updatedFirstCartItem.should.equal('Sauce Labs Backpack')
        updatedLastCartItem.should.equal('Sauce Labs Onesie')
    });
});