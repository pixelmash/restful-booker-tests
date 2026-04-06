import { Page } from '@playwright/test';

export class ReservationPage {
    constructor(private page: Page) { }


    roomDescription() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Description' }) })
    }


    roomFeatures() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Features' }) });
    }


    roomPolicies() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Policies' }) })
    }

}