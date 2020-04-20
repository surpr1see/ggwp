import { ApiModel } from '../ApiModel';

/**
 * @class
 */
export class EducationsModel extends ApiModel {
    id;

    /**
     * Constructor for the batches model. Obejct of this class is needed to make API calls to /batches
     * @constructor
     * @param {number} id id of the batch; it is used in the future API calls in methods of the created object
     */
    constructor(id) {
        super();

        this.id = id;

        this.getAllEducations = this.getAllEducations.bind(this);
        this.addEducation = this.addEducation.bind(this);
        this.updateEducation = this.updateEducation.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
        
        this.getModelRequest = this.getModelRequest.bind(this);

        //these were called in parent constructor, using this.id as undefined
        //have to call them again
        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/educations`; 
        if(this.id) {
            resultUrl = `/educations/${this.id}`; 
        }
        return resultUrl;
    }

    async getAllEducations() {
        return await this.get();
    }
    async addEducation(education) {
        return await this.post(education);
    }
    async updateEducation(education) {
        return await this.put(education);
    }
    async deleteEducation() {
        return await this.delete();
    }
}