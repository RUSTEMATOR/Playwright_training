

export default class BaseComponent {
    constructor(page) {
        this._page = page; 
        this.container = this.container ?? page.locator('html')

    }

    async waitForLoad() {
        await expect(this.container).toBeVisible()
    }
}