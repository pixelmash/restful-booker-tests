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
    heroSectionButton() {
        return this.heroSection().getByRole('link');

    }
    bookingSection() {
        return this.page.locator('#booking');
    }

    bookingSectionHeader() {
        return this.bookingSection().getByRole('heading');
    }

    bookingSectionCheckIn() {
        return this.bookingSection().locator('input').first();
    }

    bookingSectionCheckOut() {
        return this.bookingSection().locator('input').last();
    }

    bookingSectionButton() {
        return this.bookingSection().getByRole('button', { name: 'Check Availability' });
    }

    bookingSectionAlert() {
        return this.bookingSection()
            .filter({ has: this.page.getByRole('alert') })
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
        return this.footer().locator('.container')
            .filter({ has: this.page.getByRole('heading', { name: 'Shady Meadows B&B' }) });
    }

    footerContact() {
        return this.footer().locator('.container')
            .filter({ has: this.page.getByRole('heading', { name: 'Contact Us' }) });
    }

    footerLinks() {
        return this.footer().locator('.container')
            .filter({ has: this.page.getByRole('heading', { name: 'Quick Links' }) });
    }

    footerLink(text: string) {
        return this.footerLinks().getByRole('link', { name: text });
    }

    subfooter() {
        return this.footer().locator('small');
    }

    subfooterLink(text: string) {
        return this.subfooter().getByRole('link', { name: text });
    }

}