var townsend = require('../commons/townsend'),
    loginPage = require('../pageObjects/loginPage');

describe('Cafe Townsend Login Testcases', function () {
    beforeAll(function () {
        loginPage.open();
    });
    it('UI should be displayed correctly', function () {
        townsend.verifyLoginPageUI();
    });
    it('should have validations on incorrect data', function () {
        townsend.verifyLoginNegativeCases();
    });
    it('should login successfully on correct credentials', function () {
        townsend.verifySuccessfulLogin();
    });
    it('should logout successfully', function () {
        townsend.verifyLogout();
    });

});

describe('Cafe townsend employee CRUD cases', function () {
    beforeAll(function () {
        loginPage.open();
        townsend.verifySuccessfulLogin();
    });
    it('employee page UI should be displayed correctly', function () {
        townsend.verifyEmployeePageUI();
    });
    it('create employee page should have correct UI and validations', function () {
        townsend.createEmployeeNegativeCases();
    });
    it('employee should get added successfully', function () {
        townsend.verifyCreateEmployee();
    });
    it('employee details should be edited successfully', function () {
        townsend.verifyEditEmployee();
    });
    it('validation on start date for edit employee', function () {
        townsend.validateEditEmployeeWithIncorrectData();
    });
    it('employee should be deleted successfully', function () {
        townsend.verifyDeleteEmployee();
    });
});