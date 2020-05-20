/**
 * Return the text of an alert dialog
 * @returns {promise.Promise<string>}
 */
exports.getAlertText = function () {
    return browser.switchTo().alert().getText().then(function (alertText) {
        return alertText;
    });
};

/**
 * Accepts the alert
 * @returns {promise.Promise<void>}
 */
exports.acceptAlertDialog = function () {
    return browser.switchTo().alert().accept();
};