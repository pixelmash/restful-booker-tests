import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { ContactPage } from '../../pages/contact';

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
});

test('successful contact form flow', async ({ page }) => {
    const c = new ContactPage(page);
    await c.fillContactForm(
        testData.contactForm.valid.name,
        testData.contactForm.valid.email,
        testData.contactForm.valid.phone,
        testData.contactForm.valid.subject,
        testData.contactForm.valid.description);
    await c.submitContactForm();
    await expect(c.contactText(`Thanks for getting in touch ${testData.contactForm.valid.name}!`)).toBeVisible();
    await expect(c.contactText(`We'll get back to you about`)).toBeVisible();
    await expect(c.contactText(testData.contactForm.valid.subject)).toBeVisible();
    await expect(c.contactText('as soon as possible.')).toBeVisible();
});

test('contact form with empty fields', async ({ page }) => {
    const c = new ContactPage(page);
    await c.submitContactForm();
    await expect(c.contactText('Name may not be blank')).toBeVisible();
    await expect(c.contactText('Subject may not be blank')).toBeVisible();
    await expect(c.contactText('Message may not be blank')).toBeVisible();
    await expect(c.contactText('Email may not be blank')).toBeVisible();
    await expect(c.contactText('Phone may not be blank')).toBeVisible();
    await expect(c.contactText('Message must be between 20 and 2000 characters.')).toBeVisible();
});

test('contact form with too short phone', async ({ page }) => {
    const c = new ContactPage(page);
    await c.fillContactForm(
        testData.contactForm.valid.name,
        testData.contactForm.valid.email,
        testData.contactForm.invalid.phone,
        testData.contactForm.valid.subject,
        testData.contactForm.valid.description);
    await c.submitContactForm();
    await expect(c.contactText('Phone must be between 11 and 21 characters.')).toBeVisible();
});

test('contact form with too short subject', async ({ page }) => {
    const c = new ContactPage(page);
    await c.fillContactForm(
        testData.contactForm.valid.name,
        testData.contactForm.valid.email,
        testData.contactForm.valid.phone,
        testData.contactForm.invalid.subject,
        testData.contactForm.valid.description);
    await c.submitContactForm();
    await expect(c.contactText('Subject must be between 5 and 100 characters.')).toBeVisible();
});

test('contact form with too short message', async ({ page }) => {
    const c = new ContactPage(page);
    await c.fillContactForm(
        testData.contactForm.valid.name,
        testData.contactForm.valid.email,
        testData.contactForm.valid.phone,
        testData.contactForm.valid.subject,
        testData.contactForm.invalid.description);
    await c.submitContactForm();
    await expect(c.contactText('Message must be between 20 and 2000 characters.')).toBeVisible();
});

