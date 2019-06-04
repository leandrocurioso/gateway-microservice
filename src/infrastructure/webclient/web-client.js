class WebClient {

    constructor({ requestPromise, logger }) {
        this.requestPromise = requestPromise;
        this.logger = logger;
    }

    async call(params) {
        const requestObj = {
            uri: params.uri || "/",
            headers: params.headers || {},
            json: params.json || true,
            method: params.method || "GET",
            resolveWithFullResponse: params.resolveWithFullResponse || true,
            simple: params.simple || false
        };
        if (params.qs) requestObj["qs"] = params.qs;
        if (params.body) requestObj["body"] = params.body;
        if (params.debug) {
            this.logger.debug(params);
            delete params.debug;
        }
        return await this.requestPromise(requestObj)
                         .catch(err => { throw err; });
    }

}

module.exports = WebClient;

