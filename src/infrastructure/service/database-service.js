class DatabaseService {

    constructor({ databaseWebClient, crypto }) {
        this.databaseWebClient = databaseWebClient;
        this.crypto = crypto;
    }

    async authenticate(email, password, xRequestId) {
        const key = 'authenticate';
        
        const sql = `SELECT id AS iss, 
                            api_profile_id AS role,
                            email
                     FROM user 
                     WHERE email = :email
                     AND password = :password
                     AND active = 1 
                     LIMIT 1`;

        const { success, resultSets, err } = await this.databaseWebClient.query([
            {
                sql,
                key,
                params: { 
                    email: email.toLowerCase(), 
                    password: this.crypto.createHash('sha512').update(password).digest('hex').toString()
                 },
                parser: { 
                    iss: 'integer', 
                    role: 'integer' 
                },
                onlyFirst: true
            }
        ], xRequestId);

        if (!success && err) {
            const err = new Error("Couldn't authenticate the user, try again later.");
            err.httpStatusCode = 500;
            throw err;
        }

        const resultSet = resultSets[0][key];

        if (success && !resultSet) {
            const err = new Error("Invalid user credentials!");
            err.httpStatusCode = 403;
            throw err;
        }

        return resultSet;
    }

}

module.exports = DatabaseService;
