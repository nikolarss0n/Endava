class LoginPage {
    title = '.title'
    username = '[data-test="username"]'
    password = '[data-test="password"]'
    loginButton = '[data-test="login-button"]'


    login = async (helpers, url, username, password) => {
        await helpers.driver.get(url);
        await helpers.getElement(this.username).sendKeys(username);
        await helpers.getElement(this.password).sendKeys(password);
        await helpers.getElement(this.loginButton).click()
    }
}

module.exports = {
    LoginPage
}