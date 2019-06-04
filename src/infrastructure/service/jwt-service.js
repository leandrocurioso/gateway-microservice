class JwtService {

    constructor({ jsonWebToken }) {
        this.jsonWebToken = jsonWebToken;
    }

    sign(data, secretkey, hoursToExpire = 24) {
        return new Promise((resolve, reject) => {
            this.jsonWebToken.sign(JSON.parse(JSON.stringify(Object.assign({}, data, {
                exp: Math.floor(Date.now() / 1000) + (60 * (60 * hoursToExpire))
            }))), secretkey, { algorithm: "HS512" }, (err, token) => {
                if (err) return reject(err);
                return resolve(token);
            });
        });
    }

    payloadToBase64(payload) {
        return new Buffer(JSON.stringify(payload)).toString('base64');
    }

    verify(token, secretkey) {
        return new Promise((resolve, reject) => {
            this.jsonWebToken.verify(token, secretkey, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
    }
}

module.exports = JwtService;
