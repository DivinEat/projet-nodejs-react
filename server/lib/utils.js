exports.prettifyValidationErrors = (errors) =>
    Object.keys(errors).reduce((acc, err) => {
        acc[err] = errors[err].message;
        return acc;
    }, {});

exports.generateCredentials = (merchantId) => {
    const randomstring = require('randomstring');

    return {
        clientId: randomstring.generate(),
        clientSecret: randomstring.generate(),
        merchantId: merchantId
    }
};


