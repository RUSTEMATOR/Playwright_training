import BasePage from "../BasePage";


export default class WelcomePage extends BasePage  {

    constructor(page) {
        super(page, '/', page.locator('.header-link.-guest'));

        this.signUpButton = page.locator('.hero-descriptor_btn')
    }


}