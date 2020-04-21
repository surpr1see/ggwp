<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.education-form-model
            variant="primary"
            class="mt-4"
        >
            Edit Selected Education
        </b-button>

        <b-modal
            id="education-form-model"
            title="Add Education"
            @ok="editEducation"
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
    name: "EditEducationForm",
    props: {
        refreshEducations: Function,

        selectedEducation: Object
    },
    data() {
        return {
            educationProgramTitle: this.selectedEducation.educationProgramTitle,
            grade: this.selectedEducation.grade,
            totalAmountOfGraduates: this.selectedEducation.totalAmountOfGraduates,
            amountOfGraduatesParticipated: this.selectedEducation.amountOfGraduatesParticipated,
            amountOfEmployed: this.selectedEducation.amountOfEmployed,
            amountOfUnemployed: this.selectedEducation.amountOfUnemployed,
            amountOfEmployedInScience: this.selectedEducation.amountOfEmployedInScience,
            amountOfUnavailableToEmploy: this.selectedEducation.amountOfUnavailableToEmploy,
            amountOfStartedBusiness: this.selectedEducation.amountOfStartedBusiness,
            amountOfUkraineAchievements: this.selectedEducation.amountOfUkraineAchievements,
            year: this.selectedEducation.year,

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
    watch: {
        selectedEducation: function(value) {
            this.educationProgramTitle = value.educationProgramTitle,
            this.grade = value.grade,
            this.totalAmountOfGraduates = value.totalAmountOfGraduates,
            this.amountOfGraduatesParticipated = value.amountOfGraduatesParticipated,
            this.amountOfEmployed = value.amountOfEmployed,
            this.amountOfUnemployed = value.amountOfUnemployed,
            this.amountOfEmployedInScience = value.amountOfEmployedInScience,
            this.amountOfUnavailableToEmploy = value.amountOfUnavailableToEmploy,
            this.amountOfStartedBusiness = value.amountOfStartedBusiness,
            this.amountOfUkraineAchievements = value.amountOfUkraineAchievements,
            this.year = value.year
        }
    },
    methods: {
        async editEducation() {
            const educationsModelInstance = new EducationsModel(this.selectedEducation._id);

            await educationsModelInstance.updateEducation({
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

            await this.refreshEducations();
        }
    }
}
</script>