import { ApiModel } from '../ApiModel';

/**
 * @class
 */
export class GradesModel extends ApiModel {
    id;

    /**
     * Constructor for the batches model. Obejct of this class is needed to make API calls to /batches
     * @constructor
     * @param {number} id id of the batch; it is used in the future API calls in methods of the created object
     */
    constructor(id) {
        super();

        this.id = id;

        this.getAllGrades = this.getAllGrades.bind(this);
        
        this.getModelRequest = this.getModelRequest.bind(this);

        //these were called in parent constructor, using this.id as undefined
        //have to call them again
        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/grades`; 
        if(this.id) {
            resultUrl = `/grades/${this.id}`; 
        }
        return resultUrl;
    }

    async getAllGrades() {
        return await this.get();
    }
}