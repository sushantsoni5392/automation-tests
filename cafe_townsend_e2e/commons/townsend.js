//This is a page helper class
var loginPage = require('../pageObjects/loginPage.js'),
    employeesPage = require('../pageObjects/employeesPage.js'),
    strings = require('../utils/strings'),
    testData = require('../testData/testData'),
    env = require('../environment'),
    utils = require('../utils/utilities'),
    self = this;

/**
 * Verifies the login page UI
 */
exports.verifyLoginPageUI = function () {

    //assert if the elements are displayed
    expect(loginPage.loginForm.isDisplayed()).toBe(true);
    expect(loginPage.usernameLabel.isDisplayed()).toBe(true);
    expect(loginPage.passwordLabel.isDisplayed()).toBe(true);
    expect(loginPage.usernameInput.isDisplayed()).toBe(true);
    expect(loginPage.passwordInput.isDisplayed()).toBe(true);
    expect(loginPage.loginBtn.isDisplayed()).toBe(true);

    //assert the text of the labels
    expect(loginPage.getUsernameLabelText()).toEqual(strings.username);
    expect(loginPage.getPasswordLabelText()).toEqual(strings.password);
    expect(loginPage.getLoginBtnText()).toEqual(strings.login);

};

/**
 * Verify the login page negative cases
 */
exports.verifyLoginNegativeCases = function () {

    //verify required fields, form is getting dirty
    loginPage.usernameInput.click();
    expect(loginPage.usernameInput.getAttribute('class')).toContain('invalid');
    loginPage.passwordInput.click();
    expect(loginPage.passwordInput.getAttribute('class')).toContain('invalid');

    //login with incorrect credentials
    loginPage.setUsername(testData.incorrectLoginCredentials.username);
    loginPage.setPassword(testData.incorrectLoginCredentials.password);
    loginPage.loginBtn.click();

    //wait for the error message
    browser.wait(EC.visibilityOf(loginPage.errorMsg), TIMEOUT, 'Error message was not displayed');
    expect(loginPage.getErrorMessage()).toEqual(strings.loginErrMsg);

};

/**
 * Verify that user is able to login successfully
 */
exports.verifySuccessfulLogin = function () {
    //enter correct credentials through env variables //safe way
    loginPage.setUsername(env.username);
    loginPage.setPassword(env.password);

    //form should not be invalid anymore
    expect(loginPage.usernameInput.getAttribute('class')).not.toContain('invalid');
    expect(loginPage.passwordInput.getAttribute('class')).not.toContain('invalid');

    loginPage.loginBtn.click();

    //wait for login
    browser.wait(EC.visibilityOf(employeesPage.logoutBtn), TIMEOUT, 'Logout button was not displayed');

    expect(employeesPage.getGreetings()).toContain(env.username);

};

/**
 * Verify the UI of the Employee Page
 */
exports.verifyEmployeePageUI = function () {
    expect(employeesPage.greetings.isDisplayed()).toBe(true);
    expect(employeesPage.createBtn.isDisplayed()).toBe(true);
    expect(employeesPage.editBtn.isDisplayed()).toBe(true);
    expect(employeesPage.deleteBtn.isDisplayed()).toBe(true);
    expect(employeesPage.employeesList.isDisplayed()).toBe(true);

    //verify texts
    expect(employeesPage.logoutBtn.getText()).toEqual(strings.logout);
    expect(employeesPage.createBtn.getText()).toEqual(strings.create);
    expect(employeesPage.editBtn.getText()).toEqual(strings.edit);
    expect(employeesPage.deleteBtn.getText()).toEqual(strings.delete);


};

/**
 * Verifies labels on Add/Edit page
 * @param isUpdate
 */
exports.verifyAddUpdateLabels = function (isUpdate) {
    //verify UI elements
    expect(employeesPage.firstNameInput.isDisplayed()).toBe(true);
    expect(employeesPage.lastNameInput.isDisplayed()).toBe(true);
    expect(employeesPage.startDateInput.isDisplayed()).toBe(true);
    expect(employeesPage.emailInput.isDisplayed()).toBe(true);

    //if employee update check for update button
    if (isUpdate) {
        expect(employeesPage.updateEmployeeBtn.isDisplayed()).toBe(true);
    }
    else {
        expect(employeesPage.addEmployeeBtn.isDisplayed()).toBe(true);
    }
};

/**
 * Verify negative cases while creating an employee
 */
exports.createEmployeeNegativeCases = function () {

    employeesPage.createBtn.click();

    //wait for the page to load
    browser.wait(EC.visibilityOf(employeesPage.addEmployeeBtn), TIMEOUT, 'Add button was not displayed');

    //verify labels
    self.verifyAddUpdateLabels();

    //check form validations
    employeesPage.firstNameInput.click();
    expect(employeesPage.firstNameInput.getAttribute('class')).toContain('invalid');
    employeesPage.lastNameInput.click();
    expect(employeesPage.lastNameInput.getAttribute('class')).toContain('invalid');
    employeesPage.startDateInput.click();
    expect(employeesPage.startDateInput.getAttribute('class')).toContain('invalid');
    employeesPage.emailInput.click();
    expect(employeesPage.emailInput.getAttribute('class')).toContain('invalid');

    //enter data with incorrect start date
    employeesPage.setFirstName(testData.firstName);
    employeesPage.setLastName(testData.lastName);
    employeesPage.setStartDate(testData.incorrectStartDate);
    employeesPage.setEmail(employeesPage.getRandomEmail());
    employeesPage.addEmployeeBtn.click();

    //Wait for alert error message
    browser.wait(EC.alertIsPresent(), TIMEOUT, 'Alert was not present').then(function () {
        expect(utils.getAlertText()).toEqual(strings.addEmpErrMsg);
        utils.acceptAlertDialog();
    });

    //cancel button should take the user back to employees page
    employeesPage.cancelBtn.click();
    expect(employeesPage.employeesList.isDisplayed()).toBe(true);

};

/**
 * Verify that the employee is getting created successfully
 */
exports.verifyCreateEmployee = function () {
    var currentEmpCount = employeesPage.getEmployeeCount();

    employeesPage.createBtn.click();
    employeesPage.clearAllFields();

    //create an employee with the correct data
    employeesPage.createEmployee(testData.firstName, testData.lastName, testData.correctStartDate, employeesPage.getRandomEmail());

    //wait for the employee to get created
    browser.wait(EC.visibilityOf(employeesPage.employeesList), TIMEOUT, 'Employees list was not displayed');

    //created employee should be added in the list
    expect(employeesPage.getEmployeeCount()).toBeGreaterThan(currentEmpCount);
};

/**
 * Edit employee verifications
 */
exports.verifyEditEmployee = function () {

    var name = undefined;
    employeesPage.allEmployees.get(0).getText().then(function (empName) {
        name = empName;

        //for editing, we will choose the first employee for simplicity
        return employeesPage.allEmployees.get(0).click();
    }).then(function () {

        employeesPage.editBtn.click();
        browser.wait(EC.visibilityOf(employeesPage.updateEmployeeBtn), TIMEOUT, 'Update button was not displayed');

        //verify the UI
        self.verifyAddUpdateLabels(true);

        var updatedFirstName = name.split(' ')[0] + 'Updated';
        var updatedLastName = name.split(' ')[1] + 'Updated';

        //update the first name and last name
        employeesPage.updateEmployee(updatedFirstName, updatedLastName, employeesPage.getCurrentStartDate(), employeesPage.getCurrentEmail());

        browser.wait(EC.visibilityOf(employeesPage.employeesList), TIMEOUT, 'Employees list was not displayed');

        //Check that the name should contain updated name
        expect(employeesPage.allEmployees.get(0).getText()).toEqual(updatedFirstName + ' ' + updatedLastName);
    });
};

/**
 * Verify edit employee negative cases
 */
exports.validateEditEmployeeWithIncorrectData = function () {
    var name = undefined;
    employeesPage.allEmployees.get(0).getText().then(function (empName) {
        name = empName;


        //for editing, we will choose the first employee for simplicity
        return employeesPage.allEmployees.get(0).click();
    }).then(function () {
        employeesPage.editBtn.click();

        //verify the UI
        self.verifyAddUpdateLabels(true);

        var updatedFirstName = name.split(' ')[0] + 'Updated';
        var updatedLastName = name.split(' ')[1] + 'Updated';

        //update the first name and last name
        employeesPage.updateEmployee(updatedFirstName, updatedLastName, testData.incorrectStartDate, employeesPage.getCurrentEmail());

        //Wait for alert error message
        browser.wait(EC.alertIsPresent(), TIMEOUT, 'Error message alert was not present').then(function () {
            expect(utils.getAlertText()).toEqual(strings.addEmpErrMsg);
            utils.acceptAlertDialog();
        });

    });
};

/**
 * Verify Logout
 */
exports.verifyLogout = function () {

    employeesPage.logout();
    expect(loginPage.loginBtn.isDisplayed()).toBe(true);
};

/**
 * Verify delete employee functionality
 */
exports.verifyDeleteEmployee = function () {
    var currentEmpCount = employeesPage.getEmployeeCount();


    //for deleting, we will choose the first employee for simplicity
    employeesPage.allEmployees.get(0).click();
    employeesPage.deleteBtn.click();
    browser.wait(EC.alertIsPresent(), TIMEOUT, 'No Alert present').then(function () {
        utils.acceptAlertDialog();

        browser.wait(EC.visibilityOf(employeesPage.employeesList), TIMEOUT, 'Employees list was not displayed');

        //deleted employee should not be added in the list
        // expect(employeesPage.getEmployeeCount()).toBeLessThan(currentEmpCount);
    });


};



