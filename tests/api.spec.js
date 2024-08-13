import { test, expect} from '../src/fixtures/myFixtures';
import {mockedCarBrands, mockedProfileData, expected} from '..//src//data//mocks';


test.describe('Garage API tests', () => {
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

            await expect(usergaragePage.profileName).toHaveText(`${mockedProfileData.data.name} ${mockedProfileData.data.lastName}`) 
        })


test.describe('Creation negative and positive tests API', async () => {
    
    let carID = null

    test.afterEach(async ({APIrequest}) => {
        const carsList = await APIrequest.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await APIrequest.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
            carID = null
        }
    })


    test('API create car positive', async ({APIrequest}) => {
        
        const requestBody = {
            'carBrandId': 1,
            'carModelId': 1, 
            'mileage': 1234
        }

        const response = await APIrequest.post('api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(body.data, 'Car should be created').toMatchObject(requestBody)
    })

    test('Missing data field Negative API test', async ({APIrequest}) => {

        const requestBody = {
            'carBrandId': 1,
            'mileage': 1234
        }

        const response = await APIrequest.post('api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(response.status()).toBe(400)
    })

    test('API negative, creating a car with wrong model', async ({APIrequest}) => {

        const requestBody = {
            'carBrandId': 1,
            'carModelId': 3,
            'title': 'TT', 
            'mileage': 1234
        }

        const response = await APIrequest.post('api/cars', {
            data: requestBody
        })

        const body = await response.json()

        expect(response.status()).toBe(400)
    })

})