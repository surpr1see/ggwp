<template>
    <div
        class="mt-4 mb-4"
    >
        <h5>Education Filters:</h5>
        <div
            class="d-flex flex-column"
        >
            <b-input
                type="text"
                placeholder="Enter program title"
                v-model="educationProgramTitle"
                class="mb-3"
                @input="filter"
            ></b-input>

            <label>
                Select Education Grade:
            </label>
            <b-select
                v-model="grade"
                :options="gradeOptions"
                class="mb-3"
                @input="filter"
            ></b-select>

            <!--<b-input
                type="number"
                placeholder="Amount Of Graduates"
                v-model="totalAmountOfGraduates"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Graduates Participated"
                v-model="amountOfGraduatesParticipated"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Employed"
                v-model="amountOfEmployed"
                class="mb-3"
            >
            </b-input>

            <b-input
                type="number"
                placeholder="Amount Of Unemployed"
                v-model="amountOfUnemployed"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Employed In Science"
                v-model="amountOfEmployedInScience"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Unavailable To Employ"
                v-model="amountOfUnavailableToEmploy"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Started Business"
                v-model="amountOfStartedBusiness"
                class="mb-3"
            ></b-input>

            <b-input
                type="number"
                placeholder="Amount Of Ukraine Achievements"
                v-model="amountOfUkraineAchievements"
                class="mb-3"
            ></b-input> -->

            <label>
                Select Education Year:
            </label>

            <b-select
                v-model="year"
                :options="yearOptions"
                class="mb-3"
                @input="filter"
            ></b-select>
        </div>
    </div>
</template>

<script>

import { YearsModel } from './../../services/models/years.js';
import { GradesModel } from './../../services/models/grades.js';

export default {
    name: "EducationsFilter",
    props: {
        educations: Array,
        setEducations: Function
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
        filter() {
            let filteredEducations = this.educations;

            if(this.educationProgramTitle) {
                filteredEducations = filteredEducations.filter(education => {
                    return education.educationProgramTitle.indexOf(this.educationProgramTitle) > -1;
                });
            }

            if(this.grade) {
                filteredEducations = filteredEducations.filter(education => {
                    return education.grade === this.grade;
                });
            }

            if(this.year) {
                filteredEducations = filteredEducations.filter(education => {
                    return education.year === this.year;
                })
            }
            this.setEducations(filteredEducations);
        }
    }
}
</script>