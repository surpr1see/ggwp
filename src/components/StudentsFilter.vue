<template>
    <div
        class="mt-4 mb-4 pl-2"
    >
        <h5>Filters:</h5>
        <div
            class="d-flex flex-column"
        >
            <b-input
                type="text"
                placeholder="Enter full name"
                v-model="name"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-input
                type="number"
                placeholder="Enter phone"
                v-model="phone"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-input
                type="text"
                placeholder="E-mail"
                v-model="socialProfile"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-input
                type="text"
                placeholder="Position"
                v-model="position"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-input
                type="text"
                placeholder="Company Title"
                v-model="companyTitle"
                class="mb-3"
                @input="filter"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Region"
                v-model="region"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-input
                type="text"
                placeholder="Field Of Activity"
                v-model="activityField"
                class="mb-3"
                @input="filter"
            ></b-input>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isNotEmployed"
                @input="filter"
            >
                Not Employed
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isFullTime"
                @input="filter"
            >
                Full Time
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isUnavailableToEmploy"
                @input="filter"
            >
                Unavailable To Employ
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="isBusinessStarted"
                @input="filter"
            >
                Business Started
            </b-form-checkbox>

            <b-input
                type="text"
                placeholder="Achievements"
                v-model="achievements"
                class="mb-3"
                @input="filter"
            ></b-input>
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

            if(this.isNotEmployed !== null) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.isNotEmployed === this.isNotEmployed
                });
            }
            if(this.isFullTime !== null) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.isFullTime === this.isFullTime
                });
            }
            if(this.isBusinessStarted !== null) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.isBusinessStarted === this.isBusinessStarted
                });
            }
            if(this.isUnavailableToEmploy !== null) {
                filteredStudents = filteredStudents.filter(student => {
                    return student.isUnavailableToEmploy === this.isUnavailableToEmploy
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