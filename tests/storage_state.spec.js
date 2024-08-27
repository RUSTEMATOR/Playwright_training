import { test, expect } from '../src/fixtures/myFixtures';

test.describe('Check if add car button is visible', () => {

    test.beforeEach('Enter the site', async ({ usergaragePage }) => {
        await usergaragePage.navigate();
    })

        test('Positive registration', async ({ usergaragePage }) => {
            await expect(usergaragePage.addCarBtn).toBeVisible();
        })
})


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
  
            expect(body, 'Response body should contain car brands').toEqual(expectedResponse)
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