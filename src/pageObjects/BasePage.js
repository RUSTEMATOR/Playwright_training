import {expect} from '@playwright/test';
import Header from '../components/Header';


export default class BasePage{
    constructor(page, url, waitPageLocator){
        this._page = page;
        this._url = url;
        this._waitPageLocator = waitPageLocator
        this.header = new Header(this._page);
    }

    async navigate() {
        await this._page.goto(this._url);
        await expect(this._waitPageLocator).toBeVisible();
    }

}