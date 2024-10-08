export const validateElderId = (elderId) => {
    if (!elderId) {
        return 'Elder ID is required.';
    }
    return /^EID\d{3}$/.test(elderId) ? null : 'Elder ID must start with "EID" followed by exactly 3 numbers.';
};    