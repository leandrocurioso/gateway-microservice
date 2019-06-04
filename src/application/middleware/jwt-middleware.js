const Middleware = require("./middleware");

class JwtMiddleware extends Middleware {

    constructor({ configuration, jwtService }) {
        super(...arguments);
        this.jwtService = jwtService;
    }

    getMethod() {
        return async (req, res, next) => {
            const rawAuthorization = req.get("Authorization");
            const err = new Error("Invalid authorization!");
            err.httpStatusCode = 403;
            if (!rawAuthorization) return next(err);
            const tokenParts = rawAuthorization.split(String.whiteSpace);
            if (tokenParts.length !== 2) return next(err);
            req.jwt = await this.jwtService.verify(tokenParts[1], this.configuration.jwt.secretKey)
                                           .catch(err => next(err));
            return next();
        };
    }
}

module.exports = JwtMiddleware;
