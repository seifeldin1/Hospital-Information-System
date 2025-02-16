"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = void 0;
const errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
exports.errorController = errorController;
