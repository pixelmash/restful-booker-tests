import { Page } from '@playwright/test';

export class ContactPage {
    constructor(private page: Page) { }

    contactSection() {
        return this.page.locator('#contact');
    }

    contactText(text: string) {
        return this.contactSection().getByText(text);
    }

    async fillContactForm(
        name?: string,
        email?: string,
        phone?: string,      
        subject?: string,    
        description?: string
    ) {
        if (name !== undefined) await this.contactSection().getByTestId('ContactName').fill(name);
        if (email !== undefined) await this.contactSection().getByTestId('ContactEmail').fill(email);
        if (phone !== undefined) await this.contactSection().getByTestId('ContactPhone').fill(phone);
        if (subject !== undefined) await this.contactSection().getByTestId('ContactSubject').fill(subject);
        if (description !== undefined) await this.contactSection().getByTestId('ContactDescription').fill(description);
    }
    async submitContactForm() {
        await this.contactSection().getByRole('button', { name: 'Submit' }).click();
    }



}