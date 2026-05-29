"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchingsErrors = void 0;
const catchingsErrors = (controller) => {
    return (req, res, next) => {
        controller(req, res, next)
            .catch(error => next(error));
    };
};
exports.catchingsErrors = catchingsErrors;
