import { test as setup, expect} from '..//..//src/fixtures/myFixtures';
import { USERS } from '../../src/data/users';
import { USER1_STORAGE_STATE_PATH } from '../../src/constants/constants';
import { appendFile } from 'fs';


setup.describe('Session Storage', () => {

    setup('Storing data', async ({APIrequest}) => {

        await APIrequest.post('/api/auth/signin', {
            data: {
                "email": USERS.USER1.email,
                "password": USERS.USER1.password,
                "remember": false
            }
        })
   
        await APIrequest.storageState({
            path: USER1_STORAGE_STATE_PATH

        // await page.goto('/')
        // await page.locator('button', {hasText: 'Sign in'}).click()
        // await page.locator('#signinEmail').fill(USERS.USER1.email)
        // await page.locator('#signinPassword').fill(USERS.USER1.password)
        // await page.locator('button', {hasText: 'Login'}).click()
        // await expect(page.locator('button', {hasText: 'Add car'})).toBeVisible()

       })
    })
})