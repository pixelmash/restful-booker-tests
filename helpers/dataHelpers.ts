export function createRoom(index: number) {
    return {
        roomid: index,
        roomName: `room${index}`,
        type: 'Single',
        accessible: index % 2 === 0,
        image: `/images/room${index}.jpg`,
        description: `Aenean porttitor mauris sit amet lacinia molestie. ${index} In posuere accumsan aliquet.`,
        features: [`${index}`, `${index + 1}`, `${index + 2}`],
        roomPrice: index * 100
    };
}

export function createRooms(count: number) {
    return Array.from({ length: count }, (_, i) => createRoom(i));
}

export function getFormattedDate(daysOffset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString('en-GB');
}