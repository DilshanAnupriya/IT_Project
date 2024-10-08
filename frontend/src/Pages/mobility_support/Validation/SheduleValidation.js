// SheduleValidation.js

export const validateElderId = (elderId) => {
        if (!elderId) {
            return 'Elder ID is required.';
        }
        return /^EID\d{3}$/.test(elderId) ? null : 'Elder ID must start with "EID" followed by exactly 3 numbers.';
};    

export const validatePhoneNumber = (number) => {
    return /^\d{10}$/.test(number) ? null : 'Phone number must be exactly 10 digits.';
};

export const validateNIC = (nic) => {
    return /^(\d{11}V|\d{12})$/.test(nic) ? null : 'NIC must be 11 digits followed by "V" or 12 digits.';
};
  
export const validateDate = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate > today ? null : 'Date must valid.';
};

export const validateTime = (time) => {
    const inputTime = new Date(`1970-01-01T${time}:00`);
    const startTime = new Date('1970-01-01T08:00:00');
    const endTime = new Date('1970-01-01T20:00:00');
    return inputTime >= startTime && inputTime <= endTime ? null : 'Time must be between 08:00 and 20:00.';
};
