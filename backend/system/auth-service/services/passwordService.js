const bcrypt = require('bcrypt');
class PasswordUtil {
    saltRounds = 10;
    hash(rawPassWord) {
        return bcrypt.hashSync(rawPassWord, this.saltRounds);
    }
    compare(rawPassword, hashedPassword) {
        return bcrypt.compareSync(rawPassword, hashedPassword);
    }
}
module.exports = new PasswordUtil();
