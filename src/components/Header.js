import BaseComponent from "./BaseComponent";
import RegPopUp from "../pageObjects/welcomePage/components/RegPopUp";
import SignInPopUP from "../pageObjects/welcomePage/components/SignInPopUp";



export default class Header extends BaseComponent {
    constructor(page){
        super(page);
        this._page = page;
        this._signInButton = page.locator('.header_signin')
        this._signUpBtn = page.locator('.btn-primary')

    }

    async clickSignInBtn(){
        await this.SignInButton.click();
        return new SignInPopUP(this._page);
    }

    async clickRegButton(){
        await this.signUpBtn.click();
        return new RegPopUp(this._page);
    }

    get signInButton(){
        return this._signInButton;
    }

    get signUpBtn(){
        return this._signUpBtn;
    }

}