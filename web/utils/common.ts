import dayjs from 'dayjs';
export function formatVndMoney(amount: number) {
    if (typeof amount === 'number') {
        // Use toLocaleString to format the amount with thousands separators
        const formattedAmount = amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formattedAmount;
    } else {
        return 'Invalid input. Please provide a number.';
    }
}

export function formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
}
export function formatDateByString(date: String) {
    return dayjs(date.toString()).format('DD/MM/YYYY');
}

export function groupBy(list: any[], keyGetter: any) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
