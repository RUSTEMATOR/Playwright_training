import {test as playwrightTest} from '@playwright/test'
import { CAR_BRANDS } from '../src/data/cars';
import { CAR_MODELS } from '../src/data/models';
import { USERS } from '../src/data/users';
import { test, expect} from '../src/fixtures/myFixtures';
import moment from 'moment';


test.describe('Creation negative and positive tests API', async () => {
    
    let carID = null

    test.afterEach(async ({apiRequest}) => {
        const carsList = await apiRequest.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await apiRequest.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
            carID = null
        }
    })


    test('API create car positive', async ({apiRequest}) => {
        
        const requestBody = {
            'carBrandId': 1,
            'carModelId': 1, 
            'mileage': 1234
        }

        const response = await apiRequest.post('api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(body.data, 'Car should be created').toMatchObject(requestBody)
    })

    test('Missing data field Negative API test', async ({apiRequest}) => {

        const requestBody = {
            'carBrandId': 1,
            'mileage': 1234
        }

        const response = await apiRequest.post('api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(response.status()).toBe(400)
    })

    test('API negative, creating a car with wrong model', async ({apiRequest}) => {

        const requestBody = {
            'carBrandId': 1,
            'carModelId': 3,
            'title': 'TT', 
            'mileage': 1234
        }

        const response = await apiRequest.post('api/cars', {
            data: requestBody
        })

        const body = await response.json()

        expect(response.status()).toBe(400)
    })

})

test.describe('Parametrized test', async () => {

    let carID = null

    test.afterEach(async ({apiRequest}) => {
        const carsList = await apiRequest.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await apiRequest.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
            carID = null
        }
    })

    
        for (const carKey of Object.keys(CAR_BRANDS.Cars)) {
            const car = CAR_BRANDS.Cars[carKey]

            for (const brand of Object.keys(CAR_MODELS.Models)) {
                
                const models = CAR_MODELS.Models[brand]

                for (const model of Object.values(models)) {
                    test(`Create ${carKey}, check ${brand} with ${model.title}`, async ({apiRequest}) => { 
                        const requestBody = {
                            "carBrandId": car.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.min(Math.random()) * 100, 100000)
                        }

                        console.log('Request Body:', requestBody);

                        const response = await apiRequest.post('/api/cars', {
                            data: requestBody
                        })

                        console.log('Response Status:', response.status());
                        console.log('Response Body:', await response.text());

                        if (`${car.title}` === `${brand}`){
                            expect(response.status(), 'Status should be valid').toBe(201)
                            const actualBody = await response.json()
                            expect(actualBody).toEqual({
                                "status": "ok",
                                "data": {
                                    'id': expect.any(Number),
                                    "carBrandId": requestBody.carBrandId,
                                    "carModelId": requestBody.carModelId,
                                    "initialMileage": requestBody.mileage,
                                    "updatedMileageAt": expect.any(String),
                                    "carCreatedAt": expect.any(String),
                                    "mileage": requestBody.mileage,
                                    "brand": car.title,
                                    "model": model.title,
                                    "logo": car.logoFilename
                                }

                                })
                        }
                        else {
                            expect(response.status(), 'Status should be invalid').toBe(404)
                        }
                    })
                }
            }
        }

})

playwrightTest.describe('Adding expenses to an existing car', async () => {

    let carID = null

    playwrightTest.afterEach(async ({request}) => {
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
            carID = null
        }
    })

    playwrightTest('Check adding car expenses to an existing car', async ({request}) => {

        const requestBodyCar = {
            'carBrandId': 1,
            'carModelId': 1, 
            'mileage': 1234
        }



        await request.post('/api/auth/signin', {
            data: {
                "email": USERS.USER2.email,
                "password": USERS.USER2.password,
                "remember": false
            }
        })



        const responseCar = await request.post('api/cars', {
            data: requestBodyCar
        })
        const bodyCar = await responseCar.json()
        expect(bodyCar.data, 'Car should be created').toMatchObject(requestBodyCar)

        const expenseMileage = requestBodyCar.mileage + Math.floor(Math.random() * 1000) + 1;


        const requestBodyExpenses = {
            "carId": bodyCar.data.id,
            "reportedAt": moment().format('YYYY-MM-DD'),
            "mileage": expenseMileage,
            "liters": 11,
            "totalCost": Math.floor(Math.min(Math.random()) * 100, 100000),
          }


        const responseExpenses = await request.post('/api/expenses', {
            data: requestBodyExpenses
        })

        const bodyExpenses = await responseExpenses.json()
        expect(bodyExpenses.data, 'Expenses should be created').toMatchObject(requestBodyExpenses)

        })
    })