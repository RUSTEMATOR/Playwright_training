import BaseComponent from "../../../components/BaseComponent";


export default class SignInPopUP extends BaseComponent  {
    constructor(page){
    super(page);
    this.container = page.locator('app-signin-modal')
    this.emailInput = page.locator('#signinEmail');
    this.passwordInput = page.locator('#signinPassword');
    this.loginBtn = this.container.locator('.btn-primary');
    }

   async fill({email, password}) {
    email && await this.emailInput.fill(email);
    password && await this.passwordInput.fill(password);
   }

    async login ({email, password}){
        await this.fill({email, password})
        await this.loginBtn.click();
    }

    get emailInput(){
        return this.emailInput;
    }

    get passwordInput(){
        return this.passwordInput;
    }

    get loginBtn(){
        return this.loginBtn;
    }


}