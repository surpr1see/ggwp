import { ApiModel } from '../ApiModel';

/**
 * @class
 */
export class StudentsModel extends ApiModel {
    id;

    /**
     * Constructor for the batches model. Obejct of this class is needed to make API calls to /batches
     * @constructor
     * @param {number} id id of the batch; it is used in the future API calls in methods of the created object
     */
    constructor(id) {
        super();

        this.id = id;

        this.getAllStudents = this.getAllStudents.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        
        this.getModelRequest = this.getModelRequest.bind(this);

        //these were called in parent constructor, using this.id as undefined
        //have to call them again
        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/students`; 
        if(this.id) {
            resultUrl = `/students/${this.id}`; 
        }
        return resultUrl;
    }

    async getAllStudents() {
        return await this.get();
    }
    async addStudent(student) {
        return await this.post(student);
    }
    async updateStudent(student) {
        return await this.put(student);
    }
    async deleteStudent() {
        return await this.delete();
    }
}