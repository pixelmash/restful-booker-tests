import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    navSection() {
        return this.page.locator('nav');
    }

    navSectionLogo() {
        return this.navSection().getByText('Shady Meadows B&B');
    }

    navSectionLink(text: string) {
        return this.navSection().getByRole('link', { name: text });
    }

    heroSection() {
        return this.page.locator('.hero');
    }
    heroSectionHeading() {
        return this.heroSection().getByRole('heading');
    }
    heroSectionText() {
        return this.heroSection().locator('p');
    }
    bookingSection() {
        return this.page.locator('#booking');
    }

    bookingSectionHeader() {
        return this.bookingSection().getByRole('heading');
    }

    bookingSectionCheckIn() {
        return this.bookingSection().getByLabel('Check In');
    }

    bookingSectionCheckOut() {
        return this.bookingSection().getByLabel('Check Out');
    }

    bookingSectionButton() {
        return this.bookingSection().getByRole('button');
    }

    amenitiesSection() {
        return this.page.locator('#amenities');
    }

    roomsSection() {
        return this.page.locator('#rooms');
    }

    locationSection() {
        return this.page.locator('#location');
    }

    locationMap() {
        return this.locationSection().locator('.pigeon-tiles-box');
    }

    locationContactInfo() {
        return this.page.locator('.card-body')
            .filter({ has: this.page.getByRole('heading', { name: 'Contact Information' }) });
    }

    contactSection() {
        return this.page.locator('#contact');
    }
    footer() {
        return this.page.locator('footer');
    }

    footerAbout() {
        return this.footer().locator('div')
            .filter({ has: this.page.getByRole('heading', { name: 'Shady Meadows B&B' }) });
    }

    footerContact() {
        return this.footer().locator('div')
            .filter({ has: this.page.getByRole('heading', { name: 'Contact Us' }) });
    }

    footerLinks() {
        return this.footer().locator('div')
            .filter({ has: this.page.getByRole('heading', { name: 'Quick Links' }) });
    }

}