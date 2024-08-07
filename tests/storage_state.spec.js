import { test, expect } from '../src/fixtures/myFixtures';

test.describe.only('Check if add car button is visible', () => {

    test.beforeEach('Enter the site', async ({ usergaragePage }) => {
        await usergaragePage.navigate();
    })

        test('Positive registration', async ({ usergaragePage }) => {
            await expect(usergaragePage.addCarBtn).toBeVisible();
        })
})