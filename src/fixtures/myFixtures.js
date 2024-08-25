import {test as base, expect as baseExpect, request as apiRequest} from "@playwright/test";
import { USER1_STORAGE_STATE_PATH } from '../constants/constants';
import GaragePage from '../pageObjects/garagePage/GaragePage';
import CarsController from "../controllers/CarsController";

export const test = base.extend({
    context: async ({ browser }, use) => { 
        const ctx = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH
        });
        // const page = await ctx.newPage();
        
        await use(ctx)

        await ctx.close()
    },

    
    apiRequest: async ({}, use ) => {
        const ctx = await apiRequest.newContext({
        storageState: USER1_STORAGE_STATE_PATH
    })
        await use(ctx)

        await ctx.dispose()
},

carsController: async ({apiRequest}, use) => {
    await use(new CarsController(apiRequest))
},

usergaragePage: async ({ page }, use) => {
    const garPage = new GaragePage(page);

    await use(garPage); 
},
})
 
export const expect = baseExpect