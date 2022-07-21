const crypto = require('crypto');
module.exports = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return [hash, salt];
};
