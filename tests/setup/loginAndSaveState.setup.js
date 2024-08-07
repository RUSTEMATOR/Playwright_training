import {expect, test as setup} from '@playwright/test';
import { USERS } from '../../src/data/users';
import { USER1_STORAGE_STATE_PATH } from '../../src/constants/constants';


setup.describe('Session Storage', () => {

    setup('Storing data', async ({page}) => {

        await page.goto('/')
        await page.locator('button', {hasText: 'Sign in'}).click()
        await page.locator('#signinEmail').fill(USERS.USER1.email)
        await page.locator('#signinPassword').fill(USERS.USER1.password)
        await page.locator('button', {hasText: 'Login'}).click()
        await expect(page.locator('button', {hasText: 'Add car'})).toBeVisible()

        await page.context().storageState({
        path: USER1_STORAGE_STATE_PATH
       })
    })
})