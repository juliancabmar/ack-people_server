module.exports.validateRegisterInput = function(
    username,
    email,
    password,
    confirmPassword
){
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username must not be empty";
    }
    if (password === '') {
        errors.password = "Password must not be empty";
    } else {
        if (password !== confirmPassword) {
            errors.confirmPassword = "Confirmation password not match";
        }
    }
    if (email.trim() === '') {
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length < 1
    }
};

module.exports.validateLoginInput = function(username, password) {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username must not be empty";
    }
    if (password === '') {
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        isValid: Object.keys(errors).length < 1
    }
};