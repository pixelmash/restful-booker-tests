import { test, expect } from '@playwright/test';
import { testData } from '../../testData';

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
});

test('check the text headers', async ({ page }) => {
    await expect(page.locator('#rooms').getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
    await expect(page.locator('#rooms').getByText(/Comfortable beds/)).toBeVisible();
});

test('all room cards have required elements', async ({ page }) => {
    const roomCards = page.locator('.room-card');
    const count = await roomCards.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const card = roomCards.nth(i);
        await expect(card.getByRole('img')).toBeVisible();
        await expect(card.getByRole('heading')).toBeVisible();
        await expect(card.getByRole('link', { name: /Book now/i })).toBeVisible();
    }
});

test('room cards badges', async ({ page }) => {
    const roomCards = page.locator('.room-card');
    const roomCount = await roomCards.count();
    for (let i = 0; i < roomCount; i++) {
        const card = roomCards.nth(i);
        const badges = card.locator('.badge');
        const badgeCount = await badges.count();
        for (let j = 0; j < badgeCount; j++) {
            await expect(badges.nth(j)).toBeVisible();
        }
    }
});


test('book now flow', async ({ page }) => {
    const card = page.locator('.room-card').first();
    await card.getByRole('link', { name: /Book now/ }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/reservation/);
    await expect(page.getByRole('button', { name: 'Reserve now' })).toBeVisible();
});
