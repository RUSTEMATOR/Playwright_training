import { test as setup, expect} from '..//..//src/fixtures/myFixtures';

import { USERS } from '../../src/data/users';
import { USER1_STORAGE_STATE_PATH} from '../../src/constants/constants';
import { appendFile } from 'fs';


setup.describe('Session Storage', () => {

    setup('Storing data', async ({apiRequest}) => {

        await apiRequest.post('/api/auth/signin', {
            data: {
                "email": USERS.USER1.email,
                "password": USERS.USER1.password,
                "remember": false
            }
        })
   
        await apiRequest.storageState({
            path: USER1_STORAGE_STATE_PATH

       })   
    })
})
