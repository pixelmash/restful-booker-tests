import 'dotenv/config';
export const testData = {
    urls: {
        ui: process.env.UI_BASE_URL,
        api: process.env.API_BASE_URL,
    },
    users: {
        admin: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
        },
        api: {
            username: process.env.API_USERNAME,
            password: process.env.API_PASSWORD,
        },
        api_invalid: {
            username: 'green',
            password: 'house123'
        }
    },
    booking: {
        valid: {
            firstname: 'Michael',
            lastname: 'Brown',
            totalprice: 499,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-08-01',
                checkout: '2026-08-08'
            }
        },
        updated: {
            firstname: 'Michael Updated',
            lastname: 'Brown Updated',
            totalprice: 599,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-09-01',
                checkout: '2026-09-08'
            }
        }
    }
};