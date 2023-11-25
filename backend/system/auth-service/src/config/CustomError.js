class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
module.exports = CustomError;
