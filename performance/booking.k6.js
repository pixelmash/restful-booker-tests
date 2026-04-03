import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// HELPER FUNCTIONS 
function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// SHARED DATA 
const userPayloads = new SharedArray('Michael Variants', function () {
    const users = [];
    for (let i = 1; i <= 100; i++) {
        const startDate = new Date(2026, 0, 1);
        const endDate = new Date(2026, 11, 31);
        const checkin = getRandomDate(startDate, endDate);
        const checkoutDate = new Date(checkin);
        checkoutDate.setDate(checkoutDate.getDate() + 7);

        users.push({
            firstname: `Michael_${i}`,
            lastname: `Brown_${i}`,
            totalprice: Math.floor(Math.random() * 1000),
            depositpaid: Math.random() < 0.5,
            bookingdates: {
                checkin: checkin,
                checkout: checkoutDate.toISOString().split('T')[0]
            }
        });
    }
    return users;
});
// K6 run options
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>0.99'],
    }
};

// TESTS
export default function () {
    // Pick one user from generated list
    const myUser = userPayloads[Math.floor(Math.random() * userPayloads.length)];
    const payload = JSON.stringify(myUser);

    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

    // Get all bookings
    const response = http.get('https://restful-booker.herokuapp.com/booking');
    check(response, { 'GET status is 200': (r) => r.status === 200 });

    // Create a specific booking
    const postResponse = http.post('https://restful-booker.herokuapp.com/booking', payload, { headers });
    check(postResponse, { 'POST status is 200': (r) => r.status === 200 });
}