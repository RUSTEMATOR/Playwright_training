import BaseComponent from "./BaseComponent"
import GaragePage from '../../garagePage/GaragePage'

export default class RegPopUp extends BaseComponent{
    constructor(page) {
        super(page)
        this._nameField = page.locator('#signupName')
        this._lastNameField = page.locator('#signupLastName')
        this._emailField = page.locator('#signupEmail')
        this._passwordField = page.locator('#signupPassword')
        this._passRepeatField = page.locator('#signupRepeatPassword')
        this._submitRegisterBtn = page.locator('ngb-modal-window > div > div > app-signup-modal > div.modal-footer > button')
        this._regPopUpModal = page.locator('app-signup-modal')

        this._nameFieldErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Name required'})
        this._lastNameFieldErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Last name required'})
        this._emailFieldErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Email required'})
        this._passwordFieldErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Password required'})
        this._passRepeatFieldErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Re-enter password required'})

        this._nameFieldLengthErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Name has to be from 2 to 20 characters long'})
        this._lastNameFieldLengthErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Last name has to be from 2 to 20 characters long'})
        this._passwordFieldLengthErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'})

        this._emailFieldViolationErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Email is incorrect'})
        this._nameFieldViolationErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Name invalid'})
        this._lastNameFieldViolationErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Name invalid'})

        this._passDontMatchErr = page.locator('div.invalid-feedback > p').filter({hasText: 'Passwords do not match'})
    }

    async fillIn({name, lastName, email, password, passRepeat}) {
        name && await this.nameField.fill(name);
        lastName && await this.lastNameField.fill(lastName);
        email && await this.emailField.fill(email);
        password && await this.passwordField.fill(password);
        passRepeat && await this.passRepeatField.fill(passRepeat);
    }

    async submitRegistration() {
        await this.submitRegisterBtn.click();
        return new GaragePage(this._page);
    }

    get nameField(){
        return this._nameField
    }

    get lastNameField(){
        return this._lastNameField
    }

    get emailField(){
        return this._emailField
    }


    get passwordField(){
        return this._passwordField
    }


    get passRepeatField(){
        return this._passRepeatField
    }

    get submitRegisterBtn(){
        return this._submitRegisterBtn
    } 

    get regPopUpModal() {
        return this._regPopUpModal;
    }

    get nameFieldErr() {
        return this._nameFieldErr;
    }

    get lastNameFieldErr() {
        return this._lastNameFieldErr;
    }

    get emailFieldErr() {
        return this._emailFieldErr;
    }

    get passwordFieldErr() {
        return this._passwordFieldErr;
    }

    get passRepeatFieldErr() {
        return this._passRepeatFieldErr;
    }

    get nameFieldLengthErr() {
        return this._nameFieldLengthErr;
    }

    get lastNameFieldLengthErr() {
        return this._lastNameFieldLengthErr;
    }

    get passwordFieldLengthErr() {
        return this._passwordFieldLengthErr;
    }

    get emailFieldViolationErr() {
        return this._emailFieldViolationErr;
    }

    get nameFieldViolationErr() {
        return this._nameFieldViolationErr;
    }

    get lastNameFieldViolationErr() {
        return this._lastNameFieldViolationErr;
    }

    get passDontMatchErr() {
        return this._passDontMatchErr;
    }





}