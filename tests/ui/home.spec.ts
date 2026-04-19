import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { HomePage } from '../../pages/home';
import { severity } from "allure-js-commons";
import { getFormattedDate } from '../../helpers/dataHelpers';

let home: HomePage;

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
    home = new HomePage(page);
});

test('logo exists', async ({ page }) => {
    await severity('critical'); 
    await expect(home.navSectionLogo()).toBeVisible();
});

test('menu links lead to correct destinations', async ({ page }) => {
    await home.navSectionLink('Rooms').click();
    await expect(home.roomsSection()).toBeInViewport();
    await expect(page).toHaveURL(/#rooms/);

    await home.navSectionLink('Booking').click();
    await expect(home.bookingSection()).toBeInViewport();
    await expect(page).toHaveURL(/#booking/);

    await home.navSectionLink('Location').click();
    await expect(home.locationSection()).toBeInViewport();
    await expect(page).toHaveURL(/#location/);

    await home.navSectionLink('Contact').click();
    await expect(home.contactSection()).toBeInViewport();
    await expect(page).toHaveURL(/#contact/);

    await home.navSectionLink('Admin').click();
    await expect(page).toHaveURL(/admin/);
});

test.fail('amenities link has no target section', async ({ page }) => {
    // BUG: Amenities section does not exist on the page
    await home.navSectionLink('Amenities').click();
    await expect(home.amenitiesSection()).toBeInViewport();
});

test('hero text is visible', async ({ page }) => {
    await expect(home.heroSectionHeading()).toBeVisible();
    await expect(home.heroSectionText()).toBeVisible();
});

test('hero image is visible', async ({ page }) => {
    await expect(home.heroSection()).toBeVisible();
});

test('hero Book Now button navigates to rooms', async ({ page }) => {
    await home.heroSectionButton().click();
    await expect(home.roomsSection()).toBeInViewport();
    await expect(page).toHaveURL(/#booking/);
});

test('check in field is visible with default date', async ({ page }) => {
    await expect(home.bookingSectionCheckIn()).toHaveValue(getFormattedDate(0));
});

test('check out field is visible with default date', async ({ page }) => {
    await expect(home.bookingSectionCheckOut()).toHaveValue(getFormattedDate(1));
});

test('booking Check Availability button navigates to rooms', async ({ page }) => {
    await home.bookingSectionButton().click();
    await expect(home.roomsSection()).toBeInViewport();
});


test.fail('booking with past dates', async ({ page }) => {
    // BUG: No validation on past check in/out dates
    await home.bookingSectionCheckIn().fill(getFormattedDate(-5));
    await home.bookingSectionCheckOut().fill(getFormattedDate(-10));
    await home.bookingSectionButton().click();
    await expect(home.bookingSectionAlert()).toBeVisible();
});

test.fail('booking with check out date sooner than check in', async ({ page }) => {
    // BUG: No validation on mismatched check in/out dates
    await home.bookingSectionCheckIn().fill(getFormattedDate(10));
    await home.bookingSectionCheckOut().fill(getFormattedDate(5));
    await home.bookingSectionButton().click();
    await expect(home.bookingSectionAlert()).toBeVisible();
});

test.fail('booking with same check out and check in dates', async ({ page }) => {
    // BUG: No validation on the same check in/out dates
    await home.bookingSectionCheckIn().fill(getFormattedDate(1));
    await home.bookingSectionCheckOut().fill(getFormattedDate(1));
    await home.bookingSectionButton().click();
    await expect(home.bookingSectionAlert()).toBeVisible();
});

test('location section is visible', async ({ page }) => {
    await expect(home.locationSection()).toBeVisible();
});

test('map is visible', async ({ page }) => {
    await expect(home.locationMap()).toBeVisible();
});

test('contact info is visible', async ({ page }) => {
    await expect(home.locationContactInfo()).toBeVisible();
});

test('footer sections is visible', async ({ page }) => {
    await expect(home.footerAbout()).toBeVisible();
    await expect(home.footerContact()).toBeVisible();
    await expect(home.footerLinks()).toBeVisible();
});

test.fail('footer links lead to correct denstinations', async ({ page }) => {
    // BUG: Footer links are broken
    await home.footerLink('Home').click();
    await expect(page).toHaveURL(/#/);

    await home.footerLink('Rooms').click();
    await expect(home.roomsSection()).toBeInViewport();
    await expect(page).toHaveURL(/#rooms/);

    await home.footerLink('Booking').click();
    await expect(home.bookingSection()).toBeInViewport();
    await expect(page).toHaveURL(/#booking/);

    await home.footerLink('Contact').click();
    await expect(home.contactSection()).toBeInViewport();
    await expect(page).toHaveURL(/#contact/);
});

test('subfooter cookie link', async ({ page }) => {
    await home.subfooterLink('Cookie-Policy').click();
    await expect(page).toHaveURL(/cookie/);


});

test('subfooter privacy link', async ({ page }) => {
    await home.subfooterLink('Privacy-Policy').click();
    await expect(page).toHaveURL(/privacy/);

});

test('subfooter admin link', async ({ page }) => {
    await home.subfooterLink('Admin Panel').click();
    await expect(page).toHaveURL(/admin/);

});