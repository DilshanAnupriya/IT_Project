const validateNIC = (nic) => {
    // Check if NIC is exactly 12 digits or 11 digits followed by 'V'
    const nicPattern = /^(\d{11}V|\d{12})$/;
    return nicPattern.test(nic);
};


const validateShedule = (shedule) => {
    const currentDate = new Date();
    const inputDate = new Date(shedule.date);
    const inputTime = new Date(`1970-01-01T${shedule.time}:00`);
    
    let errors = [];

    // Validation for date
    if (inputDate < currentDate.setHours(0, 0, 0, 0)) {
        errors.push("The date must be a future date.");
    }

    // Validation for time (8:00 AM to 8:00 PM)
    const startTime = new Date("1970-01-01T08:00:00");
    const endTime = new Date("1970-01-01T20:00:00");
    
    if (inputTime < startTime || inputTime > endTime) {
        errors.push("The time must be between 8:00 AM and 8:00 PM.");
    }

    // Validation for NIC
    if (!validateNIC(shedule.NIC)) {
        errors.push("NIC must be 12 numbers or 11 numbers followed by 'V'.");
    }
    
    // Validation for elderId (must start with 'EID' followed by 3 numbers)
   const elderIdRegex = /^EID\d{3}$/;
    if (!elderIdRegex.test(shedule.elderId)) {
        errors.push("Elder ID must start with 'EID' followed by 3 numbers.");
    }

    // Validation for phone number (must be in the format 123-456-7890 and have exactly 10 digits)
   function isValidPhoneNumber(number) {
        const phoneNumberRegex = /^\d{10}$/; // Regular expression for a 10-digit phone number
        return phoneNumberRegex.test(number);
    }


    // Return validation result
    return {
        valid: errors.length === 0,
        message: errors.join(', ')
    };


};

//}
module.exports = validateShedule;   
