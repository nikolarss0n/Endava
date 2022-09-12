const { Builder, By } = require('selenium-webdriver');

class Helpers {
    driver = new Builder().forBrowser('chrome').build();

    getElement = (cssSelector) => { return this.driver.findElement(By.css(cssSelector)) }

    getElements = (cssSelector) => { return this.driver.findElements(By.css(cssSelector)) }

    getElementText = (cssSelector) => {
        return this.getElement(cssSelector).getText().then((value) => {
            return value
        });
    }

    getElementsText = async (cssSelector) => {
        const [first, second] = await this.getElements(cssSelector)
        return [await first.getText(), await second.getText()]
    }
}

module.exports = {
    Helpers
}