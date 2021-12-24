import { validationResult } from 'express-validator';

const validation = (...validators) => {
    return [
        ...validators,
        (req, res, next) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                next();
                return;
            }
            res.status(400).json(errors.array({ onlyFirstError: true }));
        },
    ];
};

export default validation;
