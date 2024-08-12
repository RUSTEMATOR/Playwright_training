
import { test, expect} from '../src/fixtures/myFixtures';
import { mock } from 'node:test';

const mockedCarBrands = {

    'status': 'ok',
    'data': [
        {
            "id": 1, 
            "title": "Audi",
            "logoFilename": "audi.png"
        },
        
        {
            "id": 2, 
            "title": "BMW",
            "logoFilename": "bmw.png"
        },
    ]
}


const mockedProfileData = {
    "status": "ok",
    "data": {
        "userId": 135220,
        "photoFilename": "default-user.png",
        "name": "Shako",
        "lastName": "Burako"
    }
}


const expected = 
    {
        "status": "ok",
        "data": [
            {
                "id": 1,
                "title": "Audi",
                "logoFilename": "audi.png"
            },
            {
                "id": 2,
                "title": "BMW",
                "logoFilename": "bmw.png"
            },
            {
                "id": 3,
                "title": "Ford",
                "logoFilename": "ford.png"
            },
            {
                "id": 4,
                "title": "Porsche",
                "logoFilename": "porsche.png"
            },
            {
                "id": 5,
                "title": "Fiat",
                "logoFilename": "fiat.png"
            }
        ]
    }


test.describe.only('Garage API tests', () => {
    test.beforeEach(async ({usergaragePage}) => {
        await usergaragePage.navigate();
    })

        test('Positive test: valid car data mock', async ({usergaragePage, page}) => {
            await expect(usergaragePage.addCarBtn).toBeVisible();
            await page.route('/api/cars/brands', route => {
                route.fulfill({
                    status: 200, 
                    json: mockedCarBrands
                })
            })
            
            await expect(usergaragePage.addCarBtn).toBeVisible();

            await usergaragePage.addCarBtn.click();

     })

        test('API car brands test', async ({request}) => {
            const response = await request.get('/api/cars/brands')

            const body = await response.json()

            expect(body, 'Response body should contain car brands').toEqual(expected)
            })
        })



        test('Intercept and mock profile name and surname', async ({usergaragePage, page}) => {
            await usergaragePage.navigate();
            await usergaragePage.profileBtn.click();
        
            await expect(usergaragePage.profileName).toHaveText('Rako Krako')
        
            await page.route('/api/users/profile', route => {
                route.fulfill({
                    status: 200,
                    json: mockedProfileData 
                })
            })

            await page.reload()

            await expect(usergaragePage.profileName).toHaveText('Shako Burako') 
        })