import { ApiModel } from '../ApiModel';

/**
 * @class
 */
export class DownloadModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.downloadDocx = this.downloadDocx.bind(this);
        
        this.getModelRequest = this.getModelRequest.bind(this);
        this.doRequest = this.doRequest.bind(this);

        //these were called in parent constructor, using this.id as undefined
        //have to call them again
        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/download`;
        return resultUrl;
    }

    async downloadDocx() {
        return await this.get();
    }

    async doRequest(method, body, params) {
        const url = this._buildUrlWithParams(params, method === 'POST');

        window.open(url);
    }
}