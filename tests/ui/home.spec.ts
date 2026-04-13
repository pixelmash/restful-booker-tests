import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { HomePage } from '../../pages/home';

let home: HomePage;

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
    home = new HomePage(page);
});

test('logo exists', async ({ page }) => {
    await expect(home.navSectionLogo()).toBeVisible();
});

test.fail('menu links lead to correct destinations', async ({ page }) => {
    await home.navSectionLink('Rooms').click();
    await expect(home.roomsSection()).toBeInViewport();
    await expect(page).toHaveURL(/#rooms/);

    await home.navSectionLink('Booking').click();
    await expect(home.bookingSection()).toBeInViewport();
    await expect(page).toHaveURL(/#booking/);

    // BUG: Amenities section does not exist on the page
    await home.navSectionLink('Amenities').click();
    await expect(home.amenitiesSection()).toBeInViewport();
    await expect(page).toHaveURL(/#amenities/);

    await home.navSectionLink('Location').click();
    await expect(home.locationSection()).toBeInViewport();
    await expect(page).toHaveURL(/#location/);

    await home.navSectionLink('Contact').click();
    await expect(home.contactSection()).toBeInViewport();
    await expect(page).toHaveURL(/#contact/);

    await home.navSectionLink('Admin').click();
    await expect(page).toHaveURL(/admin/);
});