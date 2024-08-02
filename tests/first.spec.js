import {test, expect } from '@playwright/test';
import customMethods from './methods';
import violations from './violations';
import WelcomePage from '../src/pageObjects/welcomePage/WelcomePage';
import GaragePage from '../src/pageObjects/garagePage/GaragePage';

test.describe('Positive Reg form tests', async () => {
  let regPopUp;
  let randomEmail;
  test.describe('Reg test', async () => {
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      regPopUp = await welcomePage.header.clickRegButton();
      randomEmail = customMethods.generateRandomEmail();
    })

    test('Positive registration', async ({page}) => {
      await regPopUp.fillIn({name: 'Rako', lastName: 'Krako', email: randomEmail, password: '193786Az()', passRepeat: '193786Az()'});
      customMethods.writeToFile('logins.txt', randomEmail);
      await regPopUp.submitRegistration();

      const garagePage = new GaragePage(page);

      
      await expect(garagePage.addCarBtn).toBeVisible();
    })
  })
})
  
  test.describe('Check visibility of the reg form fields', async () => {
      let regPopUp;

      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        regPopUp = await welcomePage.header.clickRegButton();
        
      })

      test('Check if reg form opens', async ({page}) => {
        await expect(regPopUp.regPopUpModal).toBeVisible();
      })

      test('Check if name field is visible', async ({page}) => {
        await expect((regPopUp.nameField)).toBeVisible();
      })

      test('Check if surname field is visible', async ({page}) => {
        await expect(regPopUp.lastNameField).toBeVisible();
      })

      test('Check if email field is visible', async ({page}) => {
        await expect(regPopUp.passwordField).toBeVisible();
      })
      
      test('Check if password field is visible', async ({page}) => {
        await expect(regPopUp.passwordField).toBeVisible();
      })
      
      
      test('Check if repeat password field is visible', async ({page}) => {
        await expect(regPopUp.passRepeatField).toBeVisible();
      })

      test('Check if submit button is visible', async ({page}) => {
        await expect(await regPopUp.submitRegisterBtn).toBeVisible();

      })
    })

  test.describe('Check if information can be entered', async () => {
      let regPopUp; 
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      regPopUp = await welcomePage.header.clickRegButton();

    })

    test('Check if name field accepts info', async ({page}) => {
      await regPopUp.fillIn({name: 'Rako'})
      await regPopUp.nameField.blur();
      await expect(regPopUp.nameField).toHaveValue('Rako');
    })

    test('Check if surname field accepts info', async ({page}) => {
      await regPopUp.fillIn({lastName: 'Krako'})
      await regPopUp.lastNameField.blur();
      await expect(regPopUp.lastNameField).toHaveValue('Krako');
    })

    test('Check if email field accepts info', async ({page}) => {
      await regPopUp.fillIn({email: regPopUp.randomEmail})
      await regPopUp.emailField.blur();
      await expect(regPopUp.emailField).toHaveValue(regPopUp.randomEmail);
    })

    test('Check if password field accepts info', async ({page}) => {
      await regPopUp.fillIn({password: '193786Az()'});
      await regPopUp.passwordField.blur();
      await expect(regPopUp.passwordField).toHaveValue('193786Az()');
    })

    test('Check if repeat password field accepts info', async ({page}) => {
      await regPopUp.fillIn({passRepeat: '193786Az()'});
      await regPopUp.passRepeatField.blur();
      await expect(regPopUp.passRepeatField).toHaveValue('193786Az()');
      })
    })
  
  test.describe('Positive. Check submit button clicability', async () => {
    let regPopUp
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      regPopUp = await welcomePage.header.clickRegButton();
    })

    test('Check if submit button is disabled when info is not entered', async ({page}) => {
      await expect(regPopUp.submitRegisterBtn).toBeDisabled();
    })

    test('Check if submit button is enabled when info is entered', async ({page}) => {
      await regPopUp.fillIn({name: 'Rako', lastName: 'Krako', email: regPopUp.randomEmail, password: '193786Az()', passRepeat: '193786Az()'});
      await regPopUp.passRepeatField.blur();
      await expect(regPopUp.submitRegisterBtn).toBeEnabled();
    })
  })

test.describe('Negative reg form test', async () => {
    test.describe('Negative. Check submit button clicability', async () => {
      let regPopUp
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      regPopUp = await welcomePage.header.clickRegButton();
    })
        test('Check if submit button is disabled with name field only', async ({page}) => {
          regPopUp.fillIn({name: 'Rako'})
          regPopUp.nameField.blur();
          await expect(regPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with surname field only', async ({page}) => {
          regPopUp.fillIn({lastName: 'Krako'})
          regPopUp.lastNameField.blur();
          await expect(regPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with email field only', async ({page}) => {
          regPopUp.fillIn({email: regPopUp.randomEmail})
          regPopUp.emailField.blur();

          await expect(regPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with password field only', async ({page}) => {
          regPopUp.fillIn({password: '193786Az()'})
          regPopUp.passwordField.blur();
          await expect(regPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with repeat password field only', async ({page}) => {
          regPopUp.fillIn({passRepeat: '193786Az()'})
          regPopUp.passRepeatField.blur();
          await expect(regPopUp.submitRegisterBtn).toBeDisabled();
        })
      })
    
    test.describe('Input fields validation', async () => {
      test.describe('Empty fields', async () => {
        let regPopUp;
          test.beforeEach('Enter the site', async ({page}) => {
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate();
            regPopUp = await welcomePage.header.clickRegButton();
          })
          
            test('Check if name field shows error message when not filled', async ({page}) => {
              regPopUp.nameField.focus();
              regPopUp.nameField.blur();

              await expect(regPopUp.validationErr.filter({ hasText: regPopUp.errorMessages.nameFieldEmpty })).toBeVisible();
              await expect(regPopUp.validationErr.filter({ hasText: regPopUp.errorMessages.nameFieldEmpty })).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            
            test('Check if last name field shows error message when not filled', async ({page}) => {
              regPopUp.lastNameField.focus();
              regPopUp.lastNameField.blur();

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldEmpty})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldEmpty})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if email field shows error message when not filled', async ({page}) => {
              regPopUp.emailField.focus();
              regPopUp.emailField.blur();

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.emailFieldEmpty})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.emailFieldEmpty})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if password field shows error message when not filled', async ({page}) => {
              regPopUp.passwordField.focus();
              regPopUp.passwordField.blur();

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldEmpty})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldEmpty})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if repeat password field shows error message when not filled', async ({page}) => {
              regPopUp.passRepeatField.focus();
              regPopUp.passRepeatField.blur();

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passRepeatFieldEmpty})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passRepeatFieldEmpty})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.passRepeatField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
        })
      })

    test.describe('Wrong input', async () => {
      test.describe('Less than needed', async () => {
        let regPopUp;
          test.beforeEach('Enter the site', async ({page}) => {
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate();
            regPopUp = await welcomePage.header.clickRegButton();
          })
            
            test('Check if name field shows error message when less than 2 characters', async ({page}) => {
              regPopUp.fillIn({name: 'A'})
              regPopUp.nameField.focus();
              regPopUp.nameField.blur();
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldLength})).toBeVisible()

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if last name field shows error message when less than 2 characters', async ({page}) => {
              regPopUp.fillIn({lastName: 'A'})
              regPopUp.lastNameField.focus();
              regPopUp.lastNameField.blur();

          
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldLength})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if password field shows error message when less than 8 characters', async ({page}) => {
              regPopUp.fillIn({password: 'Abc'})
              regPopUp.passwordField.focus();
              regPopUp.passwordField.blur();

              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldLength})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
      })
      test.describe('More than needed', async () => {
        let regPopUp;
        test.beforeEach('Enter the site', async ({page}) => {
          const welcomePage = new WelcomePage(page)
          await welcomePage.navigate();
          regPopUp = await welcomePage.header.clickRegButton();
        })
          test('Check if name field shows error message when more than 20 characters', async ({page}) => {
            await regPopUp.fillIn({name: 'RakoKrakoRakoKrakoRakoKrakoRakoKrakokoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako'})
            regPopUp.nameField.focus();
            regPopUp.nameField.blur();
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldLength})).toBeVisible()
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(regPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when more than 20 characters', async ({page}) => {
            await regPopUp.fillIn({lastName: 'RakoKrakoRakoKrakoRakoKrakoRakoKrakokoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako'})
            regPopUp.lastNameField.focus();
            regPopUp.lastNameField.blur();
            
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldLength})).toBeVisible()
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.lastNameFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(regPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if password field shows error message when more than 15 characters', async ({page}) => {
            await regPopUp.fillIn({password: '123456789012345678'})
            regPopUp.passwordField.focus();
            regPopUp.passwordField.blur();

            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldLength})).toBeVisible()
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.passwordFieldLength})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(regPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      
      
          })
      test.describe('Email input violations', async () => {
        let regPopUp;
        test.beforeEach('Enter the site', async ({page}) => {
          const welcomePage = new WelcomePage(page)
          await welcomePage.navigate();
          regPopUp = await welcomePage.header.clickRegButton();
        })
          
          test.describe.parallel('Check if email field shows error message when email is not valid', async () => {

            for (const email of violations.emailViolations) {
              test(`Check ${email}`, async ({page}) => {
              await regPopUp.fillIn({email: email})
              await regPopUp.emailField.focus();
              await page.locator('#signupEmail').blur();

     
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.emailFieldViolation})).toBeVisible()
              await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.emailFieldViolation})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(regPopUp.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
              })
            }
     
    test.describe('Numerals in name and last name', async () => {
      let regPopUp;
      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        regPopUp = await welcomePage.header.clickRegButton();
      })
          
          test('Check if name field shows error message when contains numerals', async ({page}) => {
            regPopUp.fillIn({name: '123'})
            regPopUp.nameField.focus();
            regPopUp.nameField.blur();
            await page.locator('#signupName').fill('123');
            await page.locator('#signupName').blur();

            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldViolation})).toBeVisible()
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldViolation})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(regPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when contains numerals', async ({page}) => {
            regPopUp.fillIn({lastName: '123'})
            regPopUp.lastNameField.focus();
            regPopUp.lastNameField.blur();

            
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldViolation})).toBeVisible()        
            await expect(regPopUp.validationErr.filter({hasText: regPopUp.errorMessages.nameFieldViolation})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(regPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })
    })
      
    test.describe('Passwords don\'t match', async () => {
      let regPopUp;
      
      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        regPopUp = await welcomePage.header.clickRegButton();
      })
      
      test('Check if password field shows error message when passwords do not match', async ({page}) => {
        regPopUp.fillIn({password: '12345678', repeatPassword: '1234567'})
        regPopUp.passwordField.focus();
        regPopUp.passwordField.blur();
    
        await expect(regPopUp.passDontMatchErr.filter({hasText: regPopUp.errorMessages.passwordsDontMatch})).toBeVisible();
        await expect(regPopUp.passDontMatchErr.filter({hasText: regPopUp.errorMessages.passwordsDontMatch})).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      })
    })
  })
  })
})