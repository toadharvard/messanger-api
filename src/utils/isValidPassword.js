const crypto = require('crypto');
module.exports = (password, hash, salt) => {
    const newHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return newHash === hash;
};
