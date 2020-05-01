<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.form-model
            variant="primary"
            class="mt-4"
        >
            + Добавить студента
        </b-button>

        <b-modal
            id="form-model"
            title="Добавить студента"
            @ok="addStudent"
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
        async addStudent(event) {
            if(!this.isEducationSelected || !this.isEmailValid || !this.isPhoneValid || !this.isNameValid) {
                event.preventDefault();
                alert("Неверные данные!");
            }

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