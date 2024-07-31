import {test, expect } from '@playwright/test';
import customMethods from './methods';
import violations from './violations';
import WelcomePage from '../src/pageObjects/welcomePage/WelcomePage';


test.describe('Positive Reg form tests', async () => {
  let RegPopUp;
  let randomEmail;
  test.describe('Reg test', async () => {
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      RegPopUp = await welcomePage.header.clickRegButton();
      randomEmail = customMethods.generateRandomEmail();
    })

    test('Positive registration', async ({page}) => {
      await RegPopUp.fillIn({name: 'Rako', lastName: 'Krako', email: randomEmail, password: '193786Az()', passRepeat: '193786Az()'});
      customMethods.writeToFile('logins.txt', randomEmail);

      const garagePage = await RegPopUp.submitRegistration();

      await expect(garagePage.addCarBtn).toBeVisible();
    })
  })
})
  
  test.describe('Check visibility of the reg form fields', async () => {
      let RegPopUp;

      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        RegPopUp = await welcomePage.header.clickRegButton();
        
      })

      test('Check if reg form opens', async ({page}) => {
        await expect(RegPopUp.regPopUpModal).toBeVisible();
      })

      test('Check if name field is visible', async ({page}) => {
        await expect((RegPopUp.nameField)).toBeVisible();
      })

      test('Check if surname field is visible', async ({page}) => {
        await expect(RegPopUp.lastNameField).toBeVisible();
      })

      test('Check if email field is visible', async ({page}) => {
        await expect(RegPopUp.passwordField).toBeVisible();
      })
      
      test('Check if password field is visible', async ({page}) => {
        await expect(RegPopUp.passwordField).toBeVisible();
      })
      
      
      test('Check if repeat password field is visible', async ({page}) => {
        await expect(RegPopUp.passRepeatField).toBeVisible();
      })

      test('Check if submit button is visible', async ({page}) => {
        await expect(await RegPopUp.submitRegisterBtn).toBeVisible();

      })
    })

  test.describe('Check if information can be entered', async () => {
      let RegPopUp; 
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      RegPopUp = await welcomePage.header.clickRegButton();

    })

    test('Check if name field accepts info', async ({page}) => {
      await RegPopUp.fillIn({name: 'Rako'})
      await RegPopUp.nameField.blur();
      await expect(RegPopUp.nameField).toHaveValue('Rako');
    })

    test('Check if surname field accepts info', async ({page}) => {
      await RegPopUp.fillIn({lastName: 'Krako'})
      await RegPopUp.lastNameField.blur();
      await expect(RegPopUp.lastNameField).toHaveValue('Krako');
    })

    test('Check if email field accepts info', async ({page}) => {
      await RegPopUp.fillIn({email: 'rako@roflan.com'})
      await RegPopUp.emailField.blur();
      await expect(RegPopUp.emailField).toHaveValue('rako@roflan.com');
    })

    test('Check if password field accepts info', async ({page}) => {
      await RegPopUp.fillIn({password: '193786Az()'});
      await RegPopUp.passwordField.blur();
      await expect(RegPopUp.passwordField).toHaveValue('193786Az()');
    })

    test('Check if repeat password field accepts info', async ({page}) => {
      await RegPopUp.fillIn({passRepeat: '193786Az()'});
      await RegPopUp.passRepeatField.blur();
      await expect(RegPopUp.passRepeatField).toHaveValue('193786Az()');
      })
    })
  
  test.describe('Positive. Check submit button clicability', async () => {
    let RegPopUp
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      RegPopUp = await welcomePage.header.clickRegButton();
    })

    test('Check if submit button is disabled when info is not entered', async ({page}) => {
      await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
    })

    test('Check if submit button is enabled when info is entered', async ({page}) => {
      await RegPopUp.fillIn({name: 'Rako', lastName: 'Krako', email: 'rako@roflan.com', password: '193786Az()', passRepeat: '193786Az()'});
      await RegPopUp.passRepeatField.blur();
      await expect(RegPopUp.submitRegisterBtn).toBeEnabled();
    })
  })

test.describe('Negative reg form test', async () => {
    test.describe('Negative. Check submit button clicability', async () => {
      let RegPopUp
    test.beforeEach('Enter the site', async ({page}) => {
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate();
      RegPopUp = await welcomePage.header.clickRegButton();
    })
        test('Check if submit button is disabled with name field only', async ({page}) => {
          RegPopUp.fillIn({name: 'Rako'})
          RegPopUp.nameField.blur();
          await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with surname field only', async ({page}) => {
          RegPopUp.fillIn({lastName: 'Krako'})
          RegPopUp.lastNameField.blur();
          await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with email field only', async ({page}) => {
          RegPopUp.fillIn({email: 'rako@roflan.com'})
          RegPopUp.emailField.blur();

          await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with password field only', async ({page}) => {
          RegPopUp.fillIn({password: '193786Az()'})
          RegPopUp.passwordField.blur();
          await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
        })

        test('Check if submit button is disabled with repeat password field only', async ({page}) => {
          RegPopUp.fillIn({passRepeat: '193786Az()'})
          RegPopUp.passRepeatField.blur();
          await expect(RegPopUp.submitRegisterBtn).toBeDisabled();
        })
      })
    
    test.describe('Input fields validation', async () => {
      test.describe('Empty fields', async () => {
        let RegPopUp;
          test.beforeEach('Enter the site', async ({page}) => {
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate();
            RegPopUp = await welcomePage.header.clickRegButton();
          })
          
            test('Check if name field shows error message when not filled', async ({page}) => {
              RegPopUp.nameField.focus();
              RegPopUp.nameField.blur();

              await expect(RegPopUp.nameFieldErr).toBeVisible()
              await expect(RegPopUp.nameFieldErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            
            test('Check if last name field shows error message when not filled', async ({page}) => {
              RegPopUp.lastNameField.focus();
              RegPopUp.lastNameField.blur();

              await expect(RegPopUp.lastNameFieldErr).toBeVisible()
              await expect(RegPopUp.lastNameFieldErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if email field shows error message when not filled', async ({page}) => {
              RegPopUp.emailField.focus();
              RegPopUp.emailField.blur();

              await expect(RegPopUp.emailFieldErr).toBeVisible()
              await expect(RegPopUp.emailFieldErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if password field shows error message when not filled', async ({page}) => {
              RegPopUp.passwordField.focus();
              RegPopUp.passwordField.blur();

              await expect(RegPopUp.passwordFieldErr).toBeVisible()
              await expect(RegPopUp.passwordFieldErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            test('Check if repeat password field shows error message when not filled', async ({page}) => {
              RegPopUp.passRepeatField.focus();
              RegPopUp.passRepeatField.blur();

              await expect(RegPopUp.passRepeatFieldErr).toBeVisible()
              await expect(RegPopUp.passRepeatFieldErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.passRepeatField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
        })
      })

    test.describe('Wrong input', async () => {
      test.describe('Less than needed', async () => {
        let RegPopUp;
          test.beforeEach('Enter the site', async ({page}) => {
            const welcomePage = new WelcomePage(page)
            await welcomePage.navigate();
            RegPopUp = await welcomePage.header.clickRegButton();
          })
            
            test('Check if name field shows error message when less than 2 characters', async ({page}) => {
              RegPopUp.fillIn({name: 'A'})
              RegPopUp.nameField.focus();
              RegPopUp.nameField.blur();
              await expect(RegPopUp.nameFieldLengthErr).toBeVisible()


              await expect(RegPopUp.nameFieldLengthErr).toBeVisible()
              await expect(RegPopUp.nameFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if last name field shows error message when less than 2 characters', async ({page}) => {
              RegPopUp.fillIn({lastName: 'A'})
              RegPopUp.lastNameField.focus();
              RegPopUp.lastNameField.blur();

          
              await expect(RegPopUp.lastNameFieldLengthErr).toBeVisible()
              await expect(RegPopUp.lastNameFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            test('Check if password field shows error message when less than 8 characters', async ({page}) => {
              RegPopUp.fillIn({password: 'Abc'})
              RegPopUp.passwordField.focus();
              RegPopUp.passwordField.blur();

              await expect(RegPopUp.passwordFieldLengthErr).toBeVisible()
              await expect(RegPopUp.passwordFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
          })
      })
      test.describe('More than needed', async () => {
        let RegPopUp;
        test.beforeEach('Enter the site', async ({page}) => {
          const welcomePage = new WelcomePage(page)
          await welcomePage.navigate();
          RegPopUp = await welcomePage.header.clickRegButton();
        })
          test('Check if name field shows error message when more than 20 characters', async ({page}) => {
            await RegPopUp.fillIn({name: 'RakoKrakoRakoKrakoRakoKrakoRakoKrakokoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako'})
            RegPopUp.nameField.focus();
            RegPopUp.nameField.blur();
            await expect(RegPopUp.nameFieldLengthErr).toBeVisible()
            await expect(RegPopUp.nameFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(RegPopUp.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when more than 20 characters', async ({page}) => {
            await RegPopUp.fillIn({lastName: 'RakoKrakoRakoKrakoRakoKrakoRakoKrakokoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrakoRakoKrako'})
            RegPopUp.lastNameField.focus();
            RegPopUp.lastNameField.blur();
            
            await expect(RegPopUp.lastNameFieldLengthErr).toBeVisible()
            await expect(RegPopUp.lastNameFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(RegPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if password field shows error message when more than 15 characters', async ({page}) => {
            await RegPopUp.fillIn({password: '123456789012345678'})
            RegPopUp.passwordField.focus();
            RegPopUp.passwordField.blur();

            await expect(RegPopUp.passwordFieldLengthErr).toBeVisible()
            await expect(RegPopUp.passwordFieldLengthErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(RegPopUp.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      
      
          })
      test.describe('Email input violations', async () => {
        let RegPopUp;
        test.beforeEach('Enter the site', async ({page}) => {
          const welcomePage = new WelcomePage(page)
          await welcomePage.navigate();
          RegPopUp = await welcomePage.header.clickRegButton();
        })
          
          test.describe.parallel('Check if email field shows error message when email is not valid', async () => {

            for (const email of violations.emailViolations) {
              test(`Check ${email}`, async ({page}) => {
              await RegPopUp.fillIn({email: email})
              await RegPopUp.emailField.focus();
              await page.locator('#signupEmail').blur();

     
              await expect(RegPopUp.emailFieldViolationErr).toBeVisible()
              await expect(RegPopUp.emailFieldViolationErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
              await expect(RegPopUp.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
              })
            }
     
    test.describe('Numerals in name and last name', async () => {
      let RegPopUp;
      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        RegPopUp = await welcomePage.header.clickRegButton();
      })
          
          test('Check if name field shows error message when contains numerals', async ({page}) => {
            RegPopUp.fillIn({name: '123'})
            RegPopUp.nameField.focus();
            RegPopUp.nameField.blur();
            await page.locator('#signupName').fill('123');
            await page.locator('#signupName').blur();
            await expect(RegPopUp.nameFieldViolationErr).toBeVisible()
                            
            await expect(RegPopUp.nameFieldViolationErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(RegPopUp.nameFieldViolationErr).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })

          test('Check if last name field shows error message when contains numerals', async ({page}) => {
            RegPopUp.fillIn({lastName: '123'})
            RegPopUp.lastNameField.focus();
            RegPopUp.lastNameField.blur();

            
            await expect(RegPopUp.lastNameFieldViolationErr).toBeVisible()
                            
            await expect(RegPopUp.lastNameFieldViolationErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(RegPopUp.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
          })
    })
      
    test.describe('Passwords do not match', async () => {
      let RegPopUp;
      test.beforeEach('Enter the site', async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate();
        RegPopUp = await welcomePage.header.clickRegButton();
      })
          
          //should fail
          test('Check if password field shows error message when passwords do not match', async ({page}) => {
            const welcomePage = new WelcomePage(page)
            const RegPopUp = await welcomePage.header.clickRegButton();

            RegPopUp.fillIn({password: '12345678', repeatPassword: '1234567'})
            RegPopUp.passwordField.focus();
            RegPopUp.passwordField.blur();

            await expect(RegPopUp.passDontMatchErr).toBeVisible();
            await expect(RegPopUp.passDontMatchErr).toHaveCSS('border-color', 'rgb(220, 53, 69)');
          })
        })                    
     })
  })
})