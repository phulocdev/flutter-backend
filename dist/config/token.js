"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME
    },
    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME
    }
});
//# sourceMappingURL=token.js.map