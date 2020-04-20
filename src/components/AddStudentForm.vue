<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.form-model
            variant="primary"
            class="mt-4"
        >
            + Add Student
        </b-button>

        <b-modal
            id="form-model"
            title="Add Student"
            @ok="addStudent"
        >
            <b-input
                type="text"
                placeholder="Enter full name"
                class="mb-3"
                v-model="name"
            ></b-input>

            <label>
                Select education:
            </label>

            <b-select
                :options="educationsOptions"
                v-model="education"
                class="mb-3"
            >
            </b-select>

            <b-input
                type="number"
                placeholder="Enter phone"
                class="mb-3"
                v-model="phone"
            ></b-input>

            <b-input
                type="text"
                placeholder="E-mail"
                class="mb-3"
                v-model="socialProfile"
            ></b-input>

            <b-input
                type="text"
                placeholder="Position"
                class="mb-3"
                v-model="position"
            ></b-input>

            <b-input
                type="text"
                placeholder="Company Title"
                class="mb-3"
                v-model="companyTitle"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Region"
                class="mb-3"
                v-model="region"
            ></b-input>

            <b-input
                type="text"
                placeholder="Field Of Activity"
                class="mb-3"
                v-model="activityField"
            ></b-input>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isNotEmployed"
            >
                Not Employed
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isFullTime"
            >
                Full Time
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isUnavailableToEmploy"
            >
                Unavailable To Employ
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isBusinessStarted"
            >
                Business Started
            </b-form-checkbox>

            <b-input
                type="text"
                placeholder="Achievements"
                class="mb-3"
                v-model="achievements"
            ></b-input>
        </b-modal>
    </div>
</template>

<script>

import { StudentsModel } from './../services/models/students.js';

export default {
    name: "AddStudentForm",
    props: {
        educations: Array,
        refreshStudents: Function
    },
    data() {
        return {
            name: null,
            phone: null,
            socialProfile: null,
            position: null,
            companyTitle: null,
            region: null,
            activityField: null,
            isNotEmployed: false,
            isFullTime: false,
            isUnavailableToEmploy: false,
            isBusinessStarted: false,
            achievements: null,
            
            education: null
        }
    },
    computed: {
        educationsOptions() {
            return this.educations.map(education => {
                return {
                    text: education.educationProgramTitle,
                    value: education._id
                };
            });
        }
    },
    methods: {
        async addStudent() {
            const studentsModelInstance = new StudentsModel();

            await studentsModelInstance.addStudent({
                name: this.name,
                phone: this.phone,
                socialProfile: this.socialProfile,
                position: this.position,
                companyTitle: this.companyTitle,
                region: this.region,
                activityField: this.activityField,
                isNotEmployed: this.isNotEmployed,
                isFullTime: this.isFullTime,
                isUnavailableToEmploy: this.isUnavailableToEmploy,
                isBusinessStarted: this.isBusinessStarted,
                achievements: this.achievements,
                
                education: this.education
            });

            this.refreshStudents();
        }
    }
}
</script>