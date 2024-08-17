import {test as base, expect as baseExpect, request as APIrequest} from "@playwright/test";
import { USER1_STORAGE_STATE_PATH } from '../constants/constants';
import GaragePage from '../pageObjects/garagePage/GaragePage';


export const test = base.extend({
    context: async ({ browser }, use) => { 
        const ctx = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH
        });
        // const page = await ctx.newPage();
        
        await use(ctx)

        await ctx.close()
    },


    
    APIrequest: async ({}, use ) => {
        const ctx = await APIrequest.newContext({
        storageState: USER1_STORAGE_STATE_PATH
    })
        await use(ctx)

        await ctx.dispose()
},

    usergaragePage: async ({ page }, use) => {
        const garPage = new GaragePage(page);

        await use(garPage); 
    },
})
 
export const expect = baseExpect