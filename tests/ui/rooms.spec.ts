import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { RoomsPage } from '../../pages/rooms';

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
});

test('Check the text headers', async ({ page }) => {
    const r = new RoomsPage(page);
    await expect(r.roomsSection().getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
    await expect(r.roomsSection().getByText(/Comfortable beds/)).toBeVisible();
});

test('All room cards have required elements', async ({ page }) => {
    const r = new RoomsPage(page);
    const count = await r.roomCard().count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
        await expect(r.roomCard(i).getByRole('img')).toBeVisible();
        await expect(r.roomCard(i).getByRole('heading')).toBeVisible();
        await expect(r.roomCard(i).getByRole('link', { name: /Book now/i })).toBeVisible();
    }
});

test('Room cards badges', async ({ page }) => {
    const r = new RoomsPage(page);
    const count = await r.roomCard().count();
    for (let i = 0; i < count; i++) {
        const badgeCount = await r.roomBadge().count();
        for (let j = 0; j < badgeCount; j++) {
            await expect(r.roomBadge(j)).toBeVisible();
        }
    }
});


test('Book now flow', async ({ page }) => {
    const r = new RoomsPage(page);
    await r.clickBookNow();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/reservation/);
    await expect(page.getByRole('button', { name: 'Reserve now' })).toBeVisible();
});
