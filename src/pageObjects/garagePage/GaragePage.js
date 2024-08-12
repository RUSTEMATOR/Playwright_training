import BasePage from "../BasePage";


export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage', page.locator('button').filter({hasText: 'Add car'}));

        this._addCarBtn = page.locator('button.btn.btn-primary').filter({hasText: 'Add car'});
        this._profileBtn = page.locator('a.btn.-profile')
        this._profileName = page.locator('p.profile_name.display-4')
    }


    get addCarBtn(){
        return this._addCarBtn;
    }

    get profileBtn(){
        return this._profileBtn;
    }

    get profileName(){
        return this._profileName;
    }

}

