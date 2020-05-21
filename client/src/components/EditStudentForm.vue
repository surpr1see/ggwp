<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.edit-student-form-model
            variant="primary"
            class="mt-4"
            :disabled="!!!selectedStudent._id"
        >
            Редактировать выбранного студента
        </b-button>

        <b-modal
            id="edit-student-form-model"
            title="Редактировать студента"
            @ok="updateStudent"
            :cancel-title="Отмена"
        >
            <label>
                Полное имя:
            </label>
            <b-input
                type="text"
                placeholder="Введите полное имя"
                class="mb-3"
                v-model="name"
                :state="!!name"
            ></b-input>

            <label>
                Выберите образовательную программу:
            </label>
            <b-select
                :options="educationsOptions"
                v-model="education"
                class="mb-3"
                :state="isEducationSelected"
            >
            </b-select>

            <label>
                Мобильный телефон:
            </label>
            <b-input
                type="number"
                placeholder="xxxxxxxxxx"
                class="mb-3"
                v-model="phone"
                :state="validatePhone(phone)"
            ></b-input>

            <label>
                E-mail:
            </label>
            <b-input
                type="text"
                placeholder="Введите e-mail"
                class="mb-3"
                v-model="socialProfile"
                :state="validateEmail(socialProfile)"
            ></b-input>

            <label>
                Профиль в соц. сетях:
            </label>
            <b-input
                type="text"
                placeholder="Введите профиль в соц. сетях"
                class="mb-3"
                v-model="secondSocialProfile"
            ></b-input>

            <label>
                Занимаемая должность:
            </label>
            <b-input
                type="text"
                placeholder="Введите занимаемую должность"
                class="mb-3"
                v-model="position"
            ></b-input>

            <label>
                Компания:
            </label>
            <b-input
                type="text"
                placeholder="Введите название компании"
                class="mb-3"
                v-model="companyTitle"
            >
            </b-input>

            <label>
                Регион:
            </label>
            <b-input
                type="text"
                placeholder="Введите регион"
                class="mb-3"
                v-model="region"
            ></b-input>

            <label>
                Поле деятельности:
            </label>
            <b-input
                type="text"
                placeholder="Введите поле деятельности"
                class="mb-3"
                v-model="activityField"
            ></b-input>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isNotEmployed"
            >
                Не занят
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isFullTime"
            >
                Полный рабочий день
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isUnavailableToEmploy"
            >
                Недоступен к найму
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="isBusinessStarted"
            >
                Начал свой бизнес
            </b-form-checkbox>

            <label>
                Достижения:
            </label>
            <b-input
                type="text"
                placeholder="Введите полученные достижения"
                class="mb-3"
                v-model="achievements"
            ></b-input>

            <label>
                Источник информации:
            </label>
            <b-input
                type="text"
                placeholder="Введите источник информации о студенте"
                class="mb-3"
                v-model="informationSource"
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
        refreshStudents: Function,

        selectedStudent: Object
    },
    data() {
        return {
            name: this.selectedStudent.name,
            phone: this.selectedStudent.phone,
            socialProfile: this.selectedStudent.socialProfile,
            secondSocialProfile: this.selectedStudent.secondSocialProfile,
            position: this.selectedStudent.position,
            companyTitle: this.selectedStudent.companyTitle,
            region: this.selectedStudent.region,
            activityField: this.selectedStudent.activityField,
            isNotEmployed: this.selectedStudent.isNotEmployed,
            isFullTime: this.selectedStudent.isFullTime,
            isUnavailableToEmploy: this.selectedStudent.isUnavailableToEmploy,
            isBusinessStarted: this.selectedStudent.isBusinessStarted,
            achievements: this.selectedStudent.achievements,
            informationSource: this.selectedStudent.informationSource,
            
            education: this.selectedStudent.education
        }
    },
    watch: {
        selectedStudent: function(value) {
            this.name = value.name,
            this.phone = value.phone,
            this.socialProfile = value.socialProfile,
            this.secondSocialProfile = value.secondSocialProfile,
            this.position = value.position,
            this.companyTitle = value.companyTitle,
            this.region = value.region,
            this.activityField = value.activityField,
            this.isNotEmployed = value.isNotEmployed,
            this.isFullTime = value.isFullTime,
            this.isUnavailableToEmploy = value.isUnavailableToEmploy,
            this.isBusinessStarted = value.isBusinessStarted,
            this.achievements = value.achievements,
            this.informationSource = value.informationSource,
            
            this.education = value.education
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
        },
        isEducationSelected() {
            return !!this.education;
        },
        isEmailValid() {
            return this.validateEmail(this.socialProfile);
        },
        isPhoneValid() {
            return this.validatePhone(this.phone);
        },
        isNameValid() {
            return !!this.name;
        }
    },
    methods: {
        async updateStudent() {
            const studentsModelInstance = new StudentsModel(this.selectedStudent._id);

            await studentsModelInstance.updateStudent({
                name: this.name,
                phone: this.phone,
                socialProfile: this.socialProfile,
                secondSocialProfile: this.secondSocialProfile,
                position: this.position,
                companyTitle: this.companyTitle,
                region: this.region,
                activityField: this.activityField,
                isNotEmployed: this.isNotEmployed,
                isFullTime: this.isFullTime,
                isUnavailableToEmploy: this.isUnavailableToEmploy,
                isBusinessStarted: this.isBusinessStarted,
                achievements: this.achievements,
                informationSource: this.informationSource,
                
                education: this.education
            });

            await this.refreshStudents();
        },
        validateEmail(mail) 
        {
            return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail);
        },
        validatePhone(phone) 
        {
            return /^\d{10}$/.test(phone);
        }
    }
}
</script>