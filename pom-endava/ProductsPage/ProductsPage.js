class ProductsPage {
    addToCardBtn = '[data-test*="add-to-cart"]'
    cart = '.shopping_cart_link'
    cartItemTitle = '.inventory_item_name'
    cartRemoveBtn = '[data-test*="remove-"]'

    countCartItems = async (helpers) => {
        const itemsArr = await helpers.getElements(this.cartRemoveBtn)
        return itemsArr.length
    }

    removeCartItem = async (helpers, productNumber) => {
        await helpers.getElements(this.cartRemoveBtn)
            .then((elements) => {
                return elements[productNumber].click()
            });
    }

    goToProducts = async (helpers) => {
        await helpers.driver.get('https://www.saucedemo.com/inventory.html')
    }

    goToCart = async (helpers) => {
        await helpers.getElement(this.cart).click()
    }

    getProducstsLength = async (helpers) => {
        const length = await helpers.getElements(this.addToCardBtn).then(function (elements) {
            return elements.length
        })
        return length
    }

    addProduct = async (helpers, productNumber) => {
        await helpers.getElements(this.addToCardBtn)
            .then((elements) => {
                elements[productNumber].click()
            });
    }

    /* 
    Add products by choosing 1 of the 4 options available:
        (firstElement) will select the first element
        (lastElement) will select the last element
        (fromStart) will select the element from the beginning of the array
        (fromEnd) will select the element from the end of the array
    */
    addProducts = async (helpers, position, productNumber) => {
        if (productNumber < await this.getProducstsLength(helpers)) {
            const options = {
                'firstElement': (helpers) => this.addProduct(helpers, 0),
                'lastElement': async (helpers) => this.addProduct(helpers, await this.getProducstsLength(helpers) - 1),
                'fromStart': async (helpers, productNumber) => this.addProduct(helpers, productNumber),
                'fromEnd': async (helpers, productNumber) => this.addProduct(helpers, await this.getProducstsLength(helpers) - productNumber)
            }

            return options[position]?.(helpers, productNumber) ?? 'Ivalid product option!'
        }
    }
}

module.exports = {
    ProductsPage
}