import {test, expect } from '@playwright/test';
import customMethods from './methods';
import violations from './violations';

test.describe('Positive Reg form tests', async () => {

  test.describe('Reg test', async () => {

    test.skip('Positive registration', async ({page}) => {
      const randomEmail = customMethods.generateRandomEmail();

      await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
      await page.locator('#signupName').fill('Rako');
      await page.locator('#signupLastName').fill('Krako');
      await page.locator('#signupEmail').fill(randomEmail);
      customMethods.writeToFile('logins.txt', randomEmail);
      await page.locator('#signupPassword').fill('193786Az()');
      await page.locator('#signupRepeatPassword').fill('193786Az()');
      await page.locator('div.modal-footer > button.btn.btn-primary').click();

      await expect(page.getByRole('button', {name: 'Add car'})).toBeVisible();
    })
  })
})
  
  test.describe('Check visibility of the reg form fields', async () => {

      test.beforeEach('Enter the site', async ({page}) => {
        await page.goto('/');
        await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
      })

      test('Check if reg form opens', async ({page}) => {
        await expect(page.locator('app-signup-modal')).toBeVisible();
      })

      test('Check if name field is visible', async ({page}) => {
        await expect(page.locator('#signupName')).toBeVisible();
      })

      test('Check if surname field is visible', async ({page}) => {
        await expect(page.locator('#signupLastName')).toBeVisible();
      })

      test('Check if email field is visible', async ({page}) => {
        await expect(page.locator('#signupEmail')).toBeVisible();
      })
      
      test('Check if password field is visible', async ({page}) => {
        await expect(page.locator('#signupPassword')).toBeVisible();
      })
      
      
      test('Check if repeat password field is visible', async ({page}) => {
        await expect(page.locator('#signupRepeatPassword')).toBeVisible();
      })

      test('Check if submit button is visible', async ({page}) => {
        await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeVisible();

      })
    })

  test.describe('Check if information can be entered', async () => {
    test.beforeEach('Enter the site', async ({page}) => {
      await page.goto('/');
      await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
    })

    test('Check if name field accepts info', async ({page}) => {
      await page.locator('#signupName').fill('Rako');
      await page.locator('#signupName').blur();
      await expect(page.locator('#signupName')).toHaveValue('Rako');
    })

    test('Check if surname field accepts info', async ({page}) => {
      await page.locator('#signupLastName').fill('Krako');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('#signupLastName')).toHaveValue('Krako');
    })

    test('Check if email field accepts info', async ({page}) => {
      await page.locator('#signupEmail').fill('rako@roflan.com');
      await page.locator('#signupEmail').blur();
      await expect(page.locator('#signupEmail')).toHaveValue('rako@roflan.com');
    })

    test('Check if password field accepts info', async ({page}) => {
      await page.locator('#signupPassword').fill('193786Az()');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('#signupPassword')).toHaveValue('193786Az()');
    })

    test('Check if repeat password field accepts info', async ({page}) => {
      await page.locator('#signupRepeatPassword').fill('193786Az()');
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('#signupRepeatPassword')).toHaveValue('193786Az()');
      })
    })
  
  test.describe('Positive. Check submit button clicability', async () => {
    test.beforeEach('Enter the site', async ({page}) => {
      await page.goto('/');
      await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
    })

    test('Check if submit button is disabled when info is not entered', async ({page}) => {
      await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
    })

    test('Check if submit button is enabled when info is entered', async ({page}) => {
      await page.locator('#signupName').fill('Rako');
      await page.locator('#signupLastName').fill('Krako');
      await page.locator('#signupEmail').fill('rako@roflan.com');
      await page.locator('#signupPassword').fill('193786Az()');
      await page.locator('#signupRepeatPassword').fill('193786Az()');
      await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeEnabled();
    })
  })

test.describe('Negative reg form test', async () => {
    test.describe('Negative. Check submit button clicability', async () => {
      
    test.beforeEach('Enter the site', async ({page}) => {
      await page.goto('/');
      await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
    })
        test('Check if submit button is disabled with name field only', async ({page}) => {
          await page.locator('#signupName').fill('Rako');
          await page.locator('#signupName').blur();
          await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
        })

        test('Check if submit button is disabled with surname field only', async ({page}) => {
          await page.locator('#signupLastName').fill('Krako');
          await page.locator('#signupLastName').blur();
          await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
        })

        test('Check if submit button is disabled with email field only', async ({page}) => {
          await page.locator('#signupEmail').fill('rako@roflan.com');
          await page.locator('#signupEmail').blur();
          await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
        })

        test('Check if submit button is disabled with password field only', async ({page}) => {
          await page.locator('#signupPassword').fill('193786Az()');
          await page.locator('#signupPassword').blur();
          await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
        })

        test('Check if submit button is disabled with repeat password field only', async ({page}) => {
          await page.locator('#signupRepeatPassword').fill('193786Az()');
          await page.locator('#signupRepeatPassword').blur();
          await expect(page.locator('div.modal-footer > button.btn.btn-primary')).toBeDisabled();
        })
      })
    
    test.describe('Input fields validation', async () => {
      test.describe('Empty fields', async () => {
          test.beforeEach('Enter the site', async ({page}) => {
            await page.goto('/');
            await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
          })
          
            test('Check if name field shows error message when not filled', async ({page}) => {
              await page.locator('#signupName').focus();
              await page.locator('#signupName').blur();
              await expect(page.locator('div.invalid-feedback > p')
                          .filter({hasText: 'Name required'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Name required'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            
            test('Check if last name field shows error message when not filled', async ({page}) => {
              await page.locator('#signupLastName').focus();
              await page.locator('#signupLastName').blur();
              await expect(page.locator('div.invalid-feedback > p')
                          .filter({hasText: 'Last name required'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Last name required'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if email field shows error message when not filled', async ({page}) => {
              await page.locator('#signupEmail').focus();
              await page.locator('#signupEmail').blur();
              await expect(page.locator('div.invalid-feedback > p')
                          .filter({hasText: 'Email required'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Email required'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if password field shows error message when not filled', async ({page}) => {
              await page.locator('#signupPassword').focus();
              await page.locator('#signupPassword').blur();
              await expect(page.locator('div.invalid-feedback > p')
                          .filter({hasText: 'Password required'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Password required'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if repeat password field shows error message when not filled', async ({page}) => {
              await page.locator('#signupRepeatPassword').focus();
              await page.locator('#signupRepeatPassword').blur();
              await expect(page.locator('div.invalid-feedback > p')
                          .filter({hasText: 'Re-enter password required'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Re-enter password required'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
        })
      })

    test.describe('Wrong input', async () => {
      test.describe('Less than needed', async () => {
          test.beforeEach('Enter the site', async ({page}) => {
            await page.goto('/');
            await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
          })
            
            test('Check if name field shows error message when less than 2 characters', async ({page}) => {
              await page.locator('#signupName').fill('A');
              await page.locator('#signupName').blur();
              await expect(page.locator('div.invalid-feedback > p')
                              .filter({hasText: 'Name has to be from 2 to 20 characters long'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Name has to be from 2 to 20 characters long'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if last name field shows error message when less than 2 characters', async ({page}) => {
              await page.locator('#signupLastName').fill('A');
              await page.locator('#signupLastName').blur();
              await expect(page.locator('div.invalid-feedback > p')
                              .filter({hasText: 'Last name has to be from 2 to 20 characters long'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Last name has to be from 2 to 20 characters long'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if password field shows error message when less than 8 characters', async ({page}) => {
              await page.locator('#signupPassword').fill('1234567');
              await page.locator('#signupPassword').blur();
              await expect(page.locator('div.invalid-feedback > p')
                              .filter({hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'}))
                              .toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'}))
                              .toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
      })
      test.describe('More than needed', async () => {
        test.beforeEach('Enter the site', async ({page}) => {
          await page.goto('/');
          await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
        })
          test('Check if name field shows error message when more than 20 characters', async ({page}) => {
            await page.locator('#signupName').fill('RakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Name has to be from 2 to 20 characters long'})).toBeVisible()
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Name has to be from 2 to 20 characters long'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when more than 20 characters', async ({page}) => {
            await page.locator('#signupLastName').fill('RakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Last name has to be from 2 to 20 characters long'})).toBeVisible()
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Last name has to be from 2 to 20 characters long'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if password field shows error message when more than 15 characters', async ({page}) => {
            await page.locator('#signupPassword').fill('1234567890123456');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'}))
                            .toBeVisible()
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'}))
                            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      
      
          })
      test.describe('Email input violations', async () => {
        test.beforeEach('Enter the site', async ({page}) => {
          await page.goto('/');
          await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
        })
          
          test.describe.parallel('Check if email field shows error message when email is not valid', async () => {
            for (const email of violations.emailViolations) {
              test(`Check ${email}`, async ({page}) => {
              await page.locator('#signupEmail').focus();
              await page.locator('#signupEmail').fill(email);
              await page.locator('#signupEmail').blur();
              await expect(page.locator('div.invalid-feedback > p')
                              .filter({hasText: 'Email is incorrect'})).toBeVisible()
              await expect(page.locator('div.invalid-feedback > p')
              .filter({hasText: 'Email is incorrect'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
              })
            }
     
    test.describe('Numerals in name and last name', async () => {

      test.beforeEach('Enter the site', async ({page}) => {
        await page.goto('/');
        await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
      })
          
          test('Check if name field shows error message when contains numerals', async ({page}) => {
            await page.locator('#signupName').fill('123');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Name invalid'})).toBeVisible()
                            
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Name invalid'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when contains numerals', async ({page}) => {
            await page.locator('#signupLastName').fill('123');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Name invalid'})).toBeVisible()
                            
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Name invalid'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })
    })
      
    test.describe('Passwords do not match', async () => {
          
          //should fail
          test('Check if password field shows error message when passwords do not match', async ({page}) => {
            await page.locator('#signupPassword').fill('12345678');
            await page.locator('#signupRepeatPassword').fill('1234567');
            await page.locator('#signupRepeatPassword').blur();
            await expect(page.locator('div.invalid-feedback > p')
                            .filter({hasText: 'Passwords do not match'})).toBeVisible();
            await expect(page.locator('div.invalid-feedback > p')
            .filter({hasText: 'Passwords do not match'})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
          })
        })                    
     })
  })
})