const globalErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else if (err instanceof Error) {
        res.status(500).send({
            error: err.name,
            message: err.message,
            description: err.description,
            number: err.number,
            fileName: err.fileName,
            lineNumber: err.lineNumber,
            columnNumber: err.columnNumber,
            stack: err.stack && err.stack.split('\n'),
        });
    } else {
        next(err);
    }
};

export default globalErrorHandler;
