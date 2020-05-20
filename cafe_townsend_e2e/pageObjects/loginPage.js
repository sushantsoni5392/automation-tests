var loginPage = function () {
    'use strict';

    const loginPageUrl = 'https://cafetownsend-angular-rails.herokuapp.com/login';
    this.usernameLabel = element(by.css('#login-form > fieldset > label > span'));
    this.usernameInput = element(by.model('user.name'));
    this.passwordLabel = element(by.css('#login-form > fieldset > label + label > span'));
    this.passwordInput = element(by.model('user.password'));
    this.loginBtn = element(by.css('button[type="submit"] '));
    this.errorMsg = element(by.css('.error-message'));
    this.loginForm = element(by.css('#login-form'));

    /**
     * Get the password label text
     * @returns password label text
     */
    this.getPasswordLabelText = function () {
        return this.passwordLabel.getText().then(function (passwordLabel) {
            return passwordLabel;
        });
    };

    /**
     * This function returns the text of the login button
     * @returns
     */
    this.getLoginBtnText = function () {
        return this.loginBtn.getText().then(function (loginBtnTxt) {
            return loginBtnTxt;
        })
    };

    /**
     * Get the username label text
     * @returns username label text
     */
    this.getUsernameLabelText = function () {
        return this.usernameLabel.getText().then(function (usernameLabel) {
            return usernameLabel;
        });
    };
    /**
     * Get the error message on incorrect login
     * @returns error message
     */
    this.getErrorMessage = function () {
        return this.errorMsg.getText().then(function (errMsg) {
            return errMsg;
        });
    };

    /**
     * Enter the username into the username field
     * @param username
     */
    this.setUsername = function (username) {
        this.usernameInput.clear();
        this.usernameInput.sendKeys(username);
    };

    /**
     * Enter the password into the password field
     * @param password
     */
    this.setPassword = function (password) {
        this.passwordInput.clear();
        this.passwordInput.sendKeys(password)
    };

    /**
     * Login to the application with username and password
     * @param username
     * @param password
     */
    this.login = function (username, password) {
        this.setUsername(username);
        this.setPassword(password);
        this.loginBtn.click();
    };

    /**
     * Open the login page
     */
    this.open = function () {
        browser.get(loginPageUrl);
    };

};

module.exports = new loginPage();