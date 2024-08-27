import ExpectedResponse from '../src/data/API/expectedResponses'
import { CAR_BRANDS } from "../src/data/cars";
import { CAR_MODELS } from '../src/data/models';
import { test, expect } from "../src/fixtures/myFixtures";
import AuthController from '../src/controllers/authController';
import { test as playwrightTest, request } from '@playwright/test';
import CarsController from '../src/controllers/CarsController';
import { faker } from '@faker-js/faker';



// I like the commented afterEach approach more. It looks
// to be more simple and robust for this complex test
// and does not depend on the scope of the logic

test.describe('Create car with controller', () => {
    let carsIdToDelete
    // let carID

    test.afterEach(async ({ carsController }) => {
       

        // const carsList = await carsController.getCars()
        // const {data: cars} = await carsList.json()

        // for (const car of cars) {
        //     const res = await carsController.deleteCar(car.id)
        //     await expect(res).toBeOK()
        //     carID = null
        // }
    
    });


    // Loop through each car brand and model to create and test cars
    for (const carKey of Object.keys(CAR_BRANDS.Cars)) {
        const car = CAR_BRANDS.Cars[carKey];

        for (const brand of Object.keys(CAR_MODELS.Models)) {
            const models = CAR_MODELS.Models[brand];

            for (const model of Object.values(models)) {
                test(`Create ${carKey}, check ${brand} with ${model.title}`, async ({ carsController }) => {
                    const requestBody = {
                        "carBrandId": car.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100000)
                    };

                    console.log('Request Body:', requestBody);

                    const response = await carsController.createCar(requestBody)



                    console.log('Response Status:', response.status());
                    console.log('Response Body:', await response.text());

                
                        
                    if (car.title === brand) {
                        expect(response.status(), 'Status should be valid').toBe(201);
                        const actualBody = await response.json();
                        carsIdToDelete = actualBody.data.id

                        if(carsIdToDelete){
                            const res = await carsController.deleteCar(carsIdToDelete)
                            await expect(res).toBeOK()
                        }



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
                        });
                    } else {
                        expect(response.status(), 'Status should be invalid').toBe(404);
                    }
                    
                });
            }
        }
    }
})



test.describe('GET car brands with controller', () => {

    const expectedResponse = new ExpectedResponse

    test('GET all car brands', async ({carsController}) => {

        const response = await carsController.getCarBrands()

        console.log('Response status:', response.status());
        expect(response).toBeOK()
        
        const allCarBrands = await response.json()

        console.log(allCarBrands)

        expect(allCarBrands).toEqual(expectedResponse.ofBrands)
      
    })

});


test.describe('GET car brand by ID, check that all brands can be received', () => {

    for (const carKey of Object.keys(CAR_BRANDS.Cars)) {
        const car = CAR_BRANDS.Cars[carKey]
        const id = car.id


        test(`GET car brand by ID: ${id}`, async ({ carsController }) => {
            
            const response = await carsController.getBrandById(id)

            expect(response.status()).toBe(200)

            const carBrand = await response.json()

            expect(carBrand.data).toEqual(car)

            console.log(`${carBrand.data}\n`)

        })
    }
})


test.describe('GET all car models', () => {

    const expectedResponse = new ExpectedResponse

    test('Get all car models', async ({carsController}) => {

        const response = await carsController.getCarModels()

        const carModels = await response.json()

        expect(response).toBeOK()

        console.log('Car Models:', carModels)


        expect(carModels).toEqual(expectedResponse.ofModels)
    })
})



test.describe('GET car models by id', () => {

    for (const brand of Object.keys(CAR_MODELS.Models)) {
        const models = CAR_MODELS.Models[brand];

        for (const model of Object.values(models)) {

       const modelID = model.id

    
    

    test(`GET car by ID, id: ${modelID}`, async ({ carsController }) => {
        
        const response = await carsController.getModelsById(modelID)

        const carModel = await response.json()

        expect(response).toBeOK()


        expect(carModel.data).toEqual(model)

        console.log(`\nResponse: ${JSON.stringify(carModel.data)}\nExpected result:${JSON.stringify(model)}\n`)

    })
 }}
})


playwrightTest.describe('GET current users cars', () => {
    const expectedResponse = new ExpectedResponse
    const email = "ogrmnij_usereoyj8XTf8l@roflan.com"
    const password = "193786Az()"
    
    playwrightTest.beforeEach(async ({request}) => {
        const responseBody = {
            "email": email,
            "password": password,
            "remember": false
        }
        const authController = new AuthController(request);

        const response = await authController.signIn(responseBody)

        const {data: logged} = await response.json()
        
        expect(response.status()).toBe(200)
        console.log('Signed in')
        console.log(logged)

    });

        playwrightTest('Get current cars of the logged user', async ({request}) => {
            const carsController = new CarsController(request);
            
            const responseCars = await carsController.getCars()

            const cars = await responseCars.json()


            expect(cars.data).toEqual(expectedResponse.ofCurrentCars)

            console.log(`${JSON.stringify(cars.data)}\n`)
            console.log(`${JSON.stringify(expectedResponse.ofCurrentCars)}`)



        });
});



test.describe('POST Create a new car', async() => {
    let carID

    test.afterEach(async ({carsController}) => {
        const carsList = await carsController.getCars()
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await carsController.deleteCar(car.id)
            await expect(res).toBeOK()
            carID = null
        }

    })

    test('Create a new car', async ({carsController}) => {
        
        const mileage = faker.number.int({min: 123, max: 600})

        const requestBody = {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": mileage
              }

        const response = await carsController.createCar(requestBody)
        expect(response).toBeOK()

        const responseGetCars = await carsController.getCars()

        const car = await response.json()
        const currentCars = await responseGetCars.json()

        console.log(car)
        console.log(currentCars)

        delete car.data.carCreatedAt;
        delete car.data.updatedMileageAt;
        delete currentCars.data[0].carCreatedAt;
        delete currentCars.data[0].updatedMileageAt;

        expect([car.data]).toEqual(currentCars.data)
        

    })
})

//could have created a conditional loop to iterate over random 
//cars that should be matched with their brands 
//but that would be an overkill and i'm too tired :(

test.describe('GET current user cars by id', async () => {
    let carID
    let createdCar
    let response

    test.beforeEach(async ({carsController}) => {
        const mileage = faker.number.int({min: 123, max: 600})

        const requestBody = {
                "carBrandId": 5,
                "carModelId": 20,
                "mileage": mileage
              }

        response = await carsController.createCar(requestBody)
        createdCar = await response.json()
        expect(response).toBeOK()
    
            })
    
    test.afterEach(async ({carsController}) => {
        const carsList = await carsController.getCars()
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await carsController.deleteCar(car.id)
            await expect(res).toBeOK()
            carID = null
        }

    })


        test('Get cars by ID', async ({carsController}) => {

            const carID = createdCar.data.id;

            const responseGetCurrentCar = await carsController.getCurrentCarById(carID)
            const currentCars = await responseGetCurrentCar.json()

            console.log(createdCar)
            console.log(currentCars)

            delete createdCar.data.carCreatedAt;
            delete createdCar.data.updatedMileageAt;
            delete currentCars.data.carCreatedAt;
            delete currentCars.data.updatedMileageAt;

            expect(createdCar.data).toEqual(currentCars.data)

        })
})




test.describe('EDIT current users cars', async () => {
    let carID
    let createdCar
    let response

    test.beforeEach(async ({carsController}) => {
        const mileage = faker.number.int({min: 123, max: 600})

        const requestBody = {
                "carBrandId": 5,
                "carModelId": 20,
                "mileage": mileage
              }

        response = await carsController.createCar(requestBody)
        createdCar = await response.json()
        expect(response).toBeOK()

        console.log(createdCar)
    
            })
    
    test.afterEach(async ({carsController}) => {
        const carsList = await carsController.getCars()
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await carsController.deleteCar(car.id)
            await expect(res).toBeOK()
            carID = null
        }

    })


        test('PUT change cars by ID', async ({carsController}) => {

            const carID = createdCar.data.id;

            const changeBody = {
                'mileage': 500
            }

            const responseEditedCar = await carsController.editCar(carID, changeBody)

            const changedCar = await responseEditedCar.json()
            
            const updatedMileage = JSON.stringify(changedCar.data.mileage)
            expect(changedCar.data.mileage).toBe(500)

            console.log(updatedMileage)

            

        })
})



test.describe('DELETE current users cars', async () => {
    let carID
    let createdCar
    let response

    test.beforeEach(async ({carsController}) => {
        const mileage = faker.number.int({min: 123, max: 600})

        const requestBody = {
                "carBrandId": 5,
                "carModelId": 20,
                "mileage": mileage
              }

        response = await carsController.createCar(requestBody)
        createdCar = await response.json()
        expect(response).toBeOK()

        console.log(createdCar)
    
            })


        test('DELETE cars by ID', async ({carsController}) => {

            const carsList = await carsController.getCars()
            const {data: cars} = await carsList.json()

            for (const car of cars) {
                const res = await carsController.deleteCar(car.id)
                await expect(res).toBeOK()
                carID = null
            }


            const checkCars = await carsController.getCars()

            const carsAfterDeletion = await checkCars.json()

            expect(carID).toBeNull()

            console.log(carsAfterDeletion)

            

        })
})