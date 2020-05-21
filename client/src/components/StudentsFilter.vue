<template>
    <div
        class="mt-4 mb-4 pl-2"
    >
        <h5>Фильтрация студентов:</h5>
        <div
            class="d-flex flex-column"
        >
            <b-button v-b-toggle.collapse-3 class="m-1">По ФИО/ Номеру Телефона</b-button>
            <b-collapse id="collapse-3">
                <b-input
                    type="text"
                    placeholder="Введите ФИО"
                    v-model="name"
                    class="mb-3"
                    @input="filter"
                ></b-input>

                <b-input
                    type="number"
                    placeholder="Введите номер телефона"
                    v-model="phone"
                    class="mb-3"
                    @input="filter"
                ></b-input>
            </b-collapse>

            <b-button v-b-toggle.collapse-4 class="m-1">По E-mail</b-button>
            <b-collapse id="collapse-4">
                <b-input
                    type="text"
                    placeholder="Введите E-mail"
                    v-model="socialProfile"
                    class="mb-3"
                    @input="filter"
                ></b-input>
            </b-collapse>

            <b-button v-b-toggle.collapse-5 class="m-1">По рабочим данным</b-button>
            <b-collapse id="collapse-5">
                <label>
                    По занимаемой должности:
                </label>
                <b-input
                    type="text"
                    placeholder="Введите название должности"
                    v-model="position"
                    class="mb-3"
                    @input="filter"
                ></b-input>

                <label>
                    По названию компании:
                </label>
                <b-input
                    type="text"
                    placeholder="Введите название компании"
                    v-model="companyTitle"
                    class="mb-3"
                    @input="filter"
                >
                </b-input>
                <label>
                    По сфере деятельности:
                </label>
                <b-input
                    type="text"
                    placeholder="Введите сферу деятельности"
                    v-model="activityField"
                    class="mb-3"
                    @input="filter"
                ></b-input>
            </b-collapse>

            <b-button v-b-toggle.collapse-6 class="m-1">По региону проживания</b-button>
            <b-collapse id="collapse-6">
                <b-input
                    type="text"
                    placeholder="Введите регион"
                    v-model="region"
                    class="mb-3"
                    @input="filter"
                ></b-input>
            </b-collapse>

            <b-form-checkbox
                value="true"
                unchecked-value=null
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isNotEmployed"
                @input="filter"
            >
                Без работы
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value=null
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isFullTime"
                @input="filter"
            >
                Полная занятость
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value=null
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isUnavailableToEmploy"
                @input="filter"
            >
                Недоступны к найму
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value=null
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isBusinessStarted"
                @input="filter"
            >
                Начали свой бизнес
            </b-form-checkbox>

            <b-button v-b-toggle.collapse-7 class="m-1">По достижениям</b-button>
            <b-collapse id="collapse-7">
                <b-input
                    type="text"
                    placeholder="Введите текст достижений"
                    v-model="achievements"
                    class="mb-3"
                    @input="filter"
                ></b-input>
            </b-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: "StudentsFilter",
    props: {
        students: Array,
        setStudents: Function
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
            isNotEmployed: null,
            isFullTime: null,
            isUnavailableToEmploy: null,
            isBusinessStarted: null,
            achievements: null
        }
    },
    methods: {
        filter() {
            let filteredStudents = this.students;

            if(this.name) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.name.indexOf(this.name) > -1;
                });
            }
            if(this.phone) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.phone.indexOf(this.phone) > -1;
                });
            }
            if(this.socialProfile) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.socialProfile.indexOf(this.socialProfile) > -1;
                });
            }
            if(this.position) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.position.indexOf(this.position) > -1;
                });
            }
            if(this.companyTitle) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.companyTitle.indexOf(this.companyTitle) > -1;
                });
            }
            if(this.region) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.region.indexOf(this.region) > -1;
                });
            }
            if(this.activityField) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.activityField.indexOf(this.activityField) > -1;
                });
            }


            if((this.isNotEmployed !== null && this.isNotEmployed !== 'null') ||
                (this.isFullTime !== null && this.isFullTime !== 'null') ||
                (this.isBusinessStarted !== null && this.isBusinessStarted !== 'null') ||
                (this.isUnavailableToEmploy !== null && this.isUnavailableToEmploy !== 'null')
            ) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.isNotEmployed.toString() == this.isNotEmployed ||
                        student.isFullTime.toString() == this.isFullTime ||
                        student.isBusinessStarted.toString() == this.isBusinessStarted ||
                        student.isUnavailableToEmploy.toString() === this.isUnavailableToEmploy
                });
            }

            if(this.achievements) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.achievements.indexOf(this.achievements) > -1;
                });
            }

            this.setStudents(filteredStudents);
        }
    }
}
</script>