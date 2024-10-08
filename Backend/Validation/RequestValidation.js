const validateRequest = (shedule) => {
    const errors = []; // Initialize an empty array to collect errors

    // Validation for elderId (must start with 'EID' followed by 3 numbers)
    const elderIdRegex = /^EID\d{3}$/;
    if (!elderIdRegex.test(shedule.elderId)) {
        errors.push("Elder ID must start with 'EID' followed by 3 numbers.");
    }

    return errors; // Return the errors array
};

module.exports = validateRequest;
