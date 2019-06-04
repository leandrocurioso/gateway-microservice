const WebClient = require('./web-client');

class DatabaseWebClient extends WebClient {

    constructor({ host, xApiKey, requestPromise, logger }) {
        super(...arguments);
        this.host = host;
        this.xApiKey = xApiKey;
    }

    async call(options) {
        const requestObj = {
            uri: this.host + options.uri,
            headers: Object.assign({}, options.headers, {
                "Content-Type": "application/json",
                "X-Api-Key": this.xApiKey 
            }),
            method: options.method,
            body: options.body,
            debug: options.debug
        };
        return await super.call(requestObj);
    }

    async query(queries, xRequestId) {
        if (!queries || !Array.isArray(queries) || !queries.length) {
            throw new Error("Cannot request database microservice with an invalid/empty [queries] array.");
        }
        return await this.call({
            uri: "/v1/query",
            method: "POST",
            body: queries,
            headers: { 'X-Request-Id': xRequestId }
        }).then(response => {
            const { statusCode, body } = response;
            const { resultSets } = body;
            if (statusCode === 200) return { success: true, resultSets, err: null };
            if (statusCode === 500) this.logger.error({ body, xRequestId });
            return { success: false, resultSets: [], err: body };
        }).catch(err => {
            this.logger.error({ message: err.message, xRequestId });
            return { success: false, resultSets: [], err };
        });
    }

}

module.exports = DatabaseWebClient;
