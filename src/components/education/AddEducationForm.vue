<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.education-form-model
            variant="primary"
            class="mt-4"
        >
            + Add Education
        </b-button>

        <b-modal
            id="education-form-model"
            title="Add Education"
            @ok="addEducation"
        >
            <b-input
                type="text"
                placeholder="Program Title"
                class="mb-3"
                v-model="educationProgramTitle"
            ></b-input>

            <b-select
                :options="gradeOptions"
                placeholder="Education Grade"
                class="mb-3"
                v-model="grade"
            ></b-select>

            <b-input
                type="text"
                placeholder="Amount Of Graduates"
                class="mb-3"
                v-model="totalAmountOfGraduates"
            ></b-input>

            <b-input
                type="text"
                placeholder="Graduates Participated"
                class="mb-3"
                v-model="amountOfGraduatesParticipated"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Amount Of Employed"
                class="mb-3"
                v-model="amountOfEmployed"
            ></b-input>

            <b-input
                type="text"
                placeholder="Amount Of Unemployed"
                class="mb-3"
                v-model="amountOfUnemployed"
            ></b-input>

            <b-input
                type="text"
                placeholder="Employed In Science"
                class="mb-3"
                v-model="amountOfEmployedInScience"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Unavailable To Employ"
                class="mb-3"
                v-model="amountOfUnavailableToEmploy"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Started Business"
                class="mb-3"
                v-model="amountOfStartedBusiness"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Amount Of Ukraine Achievements"
                class="mb-3"
                v-model="amountOfUkraineAchievements"
            >
            </b-input>

            <b-select
                :options="yearOptions"
                placeholder="Education Year"
                class="mb-3"
                v-model="year"
            ></b-select>
        </b-modal>
    </div>
</template>

<script>

import { EducationsModel } from './../../services/models/educations.js';
import { YearsModel } from './../../services/models/years.js';
import { GradesModel } from './../../services/models/grades.js';

export default {
    name: "AddEducationForm",
    props: {
        refreshEducations: Function
    },
    data() {
        return {
            educationProgramTitle: null,
            grade: null,
            totalAmountOfGraduates: null,
            amountOfGraduatesParticipated: null,
            amountOfEmployed: null,
            amountOfUnemployed: null,
            amountOfEmployedInScience: null,
            amountOfUnavailableToEmploy: null,
            amountOfStartedBusiness: null,
            amountOfUkraineAchievements: null,
            year: null,

            yearOptions: [],
            gradeOptions: []
        }
    },
    async created() {
        const gradesModelInstance = new GradesModel();
        const yearsModelInstance = new YearsModel();

        this.gradeOptions = await gradesModelInstance.getAllGrades();
        this.gradeOptions = this.gradeOptions.map(grade => { return {
            text: grade.grade,
            value: grade._id
        }});
        this.yearOptions = await yearsModelInstance.getAllYears();
        this.yearOptions = this.yearOptions.map(year => { return {
            text: year.year,
            value: year._id
        }});
    },
    methods: {
        async addEducation() {
            const educationsModelInstance = new EducationsModel();

            await educationsModelInstance.addEducation({
                educationProgramTitle: this.educationProgramTitle,
                grade: this.grade,
                totalAmountOfGraduates: this.totalAmountOfGraduates,
                amountOfGraduatesParticipated: this.amountOfGraduatesParticipated,
                amountOfEmployed: this.amountOfEmployed,
                amountOfUnemployed: this.amountOfUnemployed,
                amountOfEmployedInScience: this.amountOfEmployedInScience,
                amountOfUnavailableToEmploy: this.amountOfUnavailableToEmploy,
                amountOfStartedBusiness: this.amountOfStartedBusiness,
                amountOfUkraineAchievements: this.amountOfUkraineAchievements,
                year: this.year
            });

            this.refreshEducations();
        }
    }
}
</script>