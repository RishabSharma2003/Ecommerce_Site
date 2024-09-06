import colors from 'colors'

const errorHandler = (err, req, res, next) => {
    console.log(`${err.message}`.brightYellow.bold)
    console.error(err.stack);

    // Send error response
    res.status(err.statusCode || 500).json({
        isSuccess:false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
