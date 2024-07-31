import BaseComponent from "../welcomePage/components/BaseComponent";

export default class GaragePage extends BaseComponent {
    constructor(page) {
        super(page, '/panel/garage', page.locator('.panel-page.btn-primary'));

        this._addCarBtn = page.locator('button.btn.btn-primary').filter({hasText: 'Add car'});
    }


    get addCarBtn(){
        return this._addCarBtn;
    }

}

