class ApiModel {

    modelBaseUrl;
    modelRequest;

    constructor() {
        console.log('process port: ' + process.env.PORT);
        this._buildUrl = this._buildUrl.bind(this);
        this._buildUrlWithParams = this._buildUrlWithParams.bind(this);

        if (this.getModelRequest === undefined) {
            throw new TypeError('getModelRequest has to be implemented in the derived class');
        } else {
            this.modelRequest = this.getModelRequest();
        }

        this.modelBaseUrl = this._buildUrl();
    }

    _buildUrl() {
        return `/api${this.modelRequest}`;
    }

    _buildUrlWithParams(params, insertSlash) {
        const sourceUrl = this.modelBaseUrl + ( insertSlash ? '/' : '');
        return sourceUrl;
    }

    async doRequest(method, body, params) {
        const url = this._buildUrlWithParams(params, method === 'POST');

        const response = await fetch(url, {
            method: method || 'GET',
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            const json = response.status !== 204 ?
                await response.json() :
                { status: "deleted" };
            return json;
        } else {
            throw response;
        }
    }

    async get(params) {
        return this.doRequest('GET', null, params);
    }
    async post(body, params) {
        return this.doRequest('POST', body, params);
    }
    async put(body, params) {
        return this.doRequest('PUT', body, params);
    }
    async delete(body, params) {
        return this.doRequest('DELETE', body, params);
    }

    getModelRequest() {
        throw new Error('This method has to be implemented!');
    }
}

export { ApiModel };