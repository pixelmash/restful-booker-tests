import { Page } from '@playwright/test';

export class RoomsPage {
    constructor(private page: Page) { }

    roomsSection() {
        return this.page.locator('#rooms');
    }

    roomCard(number: number = 0) {
        return this.roomsSection().locator('.room-card').nth(number);
    }

    roomBadge(number: number = 0) {
        return this.roomCard().locator('.badge').nth(number);
    }

    bookNowLocator(number: number = 0) {
        return this.roomCard(number).getByRole('link', { name: 'Book now' });
    }

    async clickBookNow(number: number = 0) {
        await this.bookNowLocator(number).click();
    }
}