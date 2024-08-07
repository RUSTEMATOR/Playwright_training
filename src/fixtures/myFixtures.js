import {test as base, expect as baseExpect} from "@playwright/test";
import { USER1_STORAGE_STATE_PATH } from '../constants/constants';
import GaragePage from '../pageObjects/garagePage/GaragePage';


export const test = base.extend({
    context: async ({ browser }, use) => { 
        const ctx = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH
        });
        const page = await ctx.newPage();
        
        await use(ctx)

        await ctx.close()
    },

    usergaragePage: async ({ page }, use) => {
        const garPage = new GaragePage(page);

        await use(garPage); 
    },
})
 
export const expect = baseExpect