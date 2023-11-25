const CustomError = require('../config/CustomError');

const handleError = (res, err) => {
    if (err instanceof CustomError) {
        const { status, message } = err;
        return res.status(status).json({ message, data: {}, status });
    }
    return res.status(500).json({ message: err.message, data: {}, status: 500 });
};

module.exports = {
    handleError,
};
