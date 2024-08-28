import { test as setup, expect} from '..//..//src/fixtures/myFixtures';

import { USERS } from '../../src/data/users';
import { USER1_STORAGE_STATE_PATH} from '../../src/constants/constants';

import fs from 'fs';


setup.describe('Session Storage', () => {

    setup('Storing data', async ({request}) => {

        await request.post('/api/auth/signin', {
            data: {
                "email": USERS.USER1.email,
                "password": USERS.USER1.password,
                "remember": false
            }
        })
        await request.storageState({
            path: USER1_STORAGE_STATE_PATH

       })  
        if (!fs.existsSync(USER1_STORAGE_STATE_PATH)){
        await request.storageState({
            path: USER1_STORAGE_STATE_PATH

       })  
    } 
    })
})
