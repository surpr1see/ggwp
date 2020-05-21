<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.edit-education-form-model
            variant="primary"
            class="mt-4"
        >
            + Добавить выпуск
        </b-button>

        <b-modal
            id="edit-education-form-model"
            title="Добавить выпуск"
            @ok="addEducation"
            :cancelTitleHtml="'Отмена'"
        >
            <label>
                Название программы обучения:
            </label>
            <b-input
                type="text"
                placeholder="Введите название программы обучения"
                class="mb-3"
                v-model="educationProgramTitle"
                :state="isEducationsTitleEntered"
            ></b-input>

            <label>
                Степень:
            </label>
            <b-select
                :options="gradeOptions"
                class="mb-3"
                v-model="grade"
                :state="isGradeSelected"
            ></b-select>

            <label>
                Общее количество выпускников:
            </label>
            <b-input
                type="text"
                placeholder="Введите общее количество выпускников"
                class="mb-3"
                v-model="totalAmountOfGraduates"
            ></b-input>

            <label>
                Количество выпускников, принявших участие в опросе:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество участовавших в опросе выпускников"
                class="mb-3"
                v-model="amountOfGraduatesParticipated"
            >
            </b-input>

            <label>
                Количество работающих:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество работающих"
                class="mb-3"
                v-model="amountOfEmployed"
            ></b-input>

            <label>
                Количество неработающих:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество неработающих"
                class="mb-3"
                v-model="amountOfUnemployed"
            ></b-input>

            <label>
                Заняты наукой:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество занятых наукой"
                class="mb-3"
                v-model="amountOfEmployedInScience"
            >
            </b-input>

            <label>
                Недоступны к найму:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество недоступных к найму"
                class="mb-3"
                v-model="amountOfUnavailableToEmploy"
            >
            </b-input>

            <label>
                Начали свой бизнес:
            </label>
            <b-input
                type="text"
                placeholder="Введите количество начавших свой бизнес"
                class="mb-3"
                v-model="amountOfStartedBusiness"
            >
            </b-input>

            <label>
                Количество студентов с всеукраинскими достижениями:
            </label>
            <b-input
                type="text"
                placeholder="Введите их количество"
                class="mb-3"
                v-model="amountOfUkraineAchievements"
            >
            </b-input>

            <label>
                Год выпуска:
            </label>
            <b-select
                :options="yearOptions"
                placeholder="Education Year"
                class="mb-3"
                v-model="year"
                :state="isYearSelected"
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
    computed: {
        isEducationsTitleEntered() {
            return !!this.educationProgramTitle;
        },
        isGradeSelected() {
            return !!this.grade;
        },
        isYearSelected() {
            return !!this.year;
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
        async addEducation(event) {
            if(!this.isEducationsTitleEntered || !this.isGradeSelected || !this.isYearSelected) {
                event.preventDefault();
                alert("Неверные данные!");
                return;
            }

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