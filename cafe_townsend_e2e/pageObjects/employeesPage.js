var employeesPage = function () {
    'use strict';
    this.greetings = element(by.css('#greetings'));
    this.logoutBtn = element(by.css('.main-button'));
    this.createBtn = element(by.css('#bAdd'));
    this.editBtn = element(by.css('#bEdit'));
    this.deleteBtn = element(by.css('#bDelete'));
    this.employeesList = element(by.css('#employee-list'));
    this.allEmployees = element.all(by.repeater('employee in employees'));
    this.addEmployeeBtn = element(by.css('button[ng-show="isCreateForm"]'));
    this.updateEmployeeBtn = element(by.css('.formFooter > button'));
    this.deleteEmployeeBtn = element(by.css('[ng-click="deleteEmployee()"]'));
    this.firstNameInput = element(by.model('selectedEmployee.firstName'));
    this.lastNameInput = element(by.model('selectedEmployee.lastName'));
    this.startDateInput = element(by.model('selectedEmployee.startDate'));
    this.emailInput = element(by.model('selectedEmployee.email'));
    this.cancelBtn = element(by.css('.subButton.bCancel'));


    /**
     * This function returns the greetings after login
     * @returns greetings
     */
    this.getGreetings = function () {
        return this.greetings.getText().then(function (greeting) {
            return greeting;
        })
    };

    /**
     * Clear all form fields
     */
    this.clearAllFields = function () {
        this.firstNameInput.clear();
        this.lastNameInput.clear();
        this.startDateInput.clear();
        this.emailInput.clear();
    };

    /**
     * Input the first name
     * @param firstName
     */
    this.setFirstName = function (firstName) {
        this.firstNameInput.clear();
        this.firstNameInput.sendKeys(firstName);
    };

    /**
     * Input the last name
     * @param lastName
     */
    this.setLastName = function (lastName) {
        this.lastNameInput.clear();
        this.lastNameInput.sendKeys(lastName);
    };

    /**
     * Input the start date
     * @param startDate
     */
    this.setStartDate = function (startDate) {
        this.startDateInput.clear();
        this.startDateInput.sendKeys(startDate);
    };

    /**
     * input the email
     * @param email
     */
    this.setEmail = function (email) {
        this.emailInput.clear();
        this.emailInput.sendKeys(email);
    };

    /**
     * Returns a random email string
     * @returns {string}
     */
    this.getRandomEmail = function () {
        return "abcd+" + (Math.floor(Math.random() * 9000) + 20000) + "@xyz.com";
    };

    /**
     * Create an employee
     * @param firstName
     * @param lastName
     * @param startDate
     * @param email
     */
    this.createEmployee = function (firstName, lastName, startDate, email) {
        this.clearAllFields();
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setStartDate(startDate);
        this.setEmail(email);
        this.addEmployeeBtn.click();
    };

    /**
     * Get the current employee count
     * @returns {*|promise.Promise<number>}
     */
    this.getEmployeeCount = function () {
        return this.allEmployees.then(function (allEmployees) {
            return allEmployees.length;
        });
    };

    /**
     * Logout of the application
     */
    this.logout = function () {
        this.logoutBtn.click();
    };

    /**
     * Returns the current start date in the input field
     * @returns {Q.Promise<any> | PromiseLike<any> | * | promise.Promise<any> | Q.IPromise<any> | Promise}
     */
    this.getCurrentStartDate = function () {
        return this.startDateInput.getAttribute('value').then(function (startDate) {
            return startDate;
        });
    };

    /**
     * Returns the current email value in the inpute field
     * @returns {Q.Promise<any> | PromiseLike<any> | * | promise.Promise<any> | Q.IPromise<any> | Promise}
     */
    this.getCurrentEmail = function () {
        return this.emailInput.getAttribute('value').then(function (email) {
            return email;
        });
    };

    /**
     * Update the employee by giving the required details
     * @param firstName
     * @param lastName
     * @param startDate
     * @param email
     */
    this.updateEmployee = function (firstName, lastName, startDate, email) {
        this.clearAllFields();
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setStartDate(startDate);
        this.setEmail(email);
        this.updateEmployeeBtn.click();
    };
};

module.exports = new employeesPage();