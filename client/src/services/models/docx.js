import { ApiModel } from '../ApiModel';

/**
 * @class
 */
export class DocxModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.generateDocx = this.generateDocx.bind(this);
        
        this.getModelRequest = this.getModelRequest.bind(this);

        //these were called in parent constructor, using this.id as undefined
        //have to call them again
        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/docx`;
        return resultUrl;
    }

    async generateDocx(educationsToDoc, studentsToDoc) {
        return await this.post({
            educationsToDoc,
            studentsToDoc
        });
    }
}