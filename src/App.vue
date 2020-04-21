<template>
    <div id="app">
        <b-tabs
            class="h-100"
        >
            <b-tab
                title="Educations"
                class="h-100"
            >
                <div
                    class="row h-100"
                >
                    <b-col
                        sm="2"
                        class="border-right h-100 pl-4"
                    >
                        <AddEducationForm
                            :refreshEducations="refreshData"/>
                        <EditEducationForm
                            :refreshEducations="refreshData"
                            :selectedEducation="selectedEducation"/>
                        <EducationsFilter
                            :educations="educations"
                            :setEducations="setEducations"/>
                    </b-col>

                    <b-col
                        sm="10"
                        class="h-100"
                    >
                        <EducationsTable
                            :educations="filteredEducations"
                            :selectEducation="selectEducation"/>
                    </b-col>
                </div>
            </b-tab>

            <b-tab
                title="Selected Education"
            >
                <div
                    class="row h-100"
                >
                    <b-col
                        sm="2"
                        class="border-right h-100"
                    >
                        <AddStudentForm
                            :educations="educations"
                            :refreshStudents="refreshData"/>
                        <EditStudentForm
                            :educations="educations"
                            :refreshStudents="refreshData"
                            :selectedStudent="selectedStudent"/>
                        <StudentsFilter
                            :students="students"
                            :setStudents="setStudents"/>
                    </b-col>

                    <b-col
                        sm="10"
                        class="h-100"
                    >
                        <StudentsTable
                            :students="filteredStudents"
                            :selectStudent="selectStudent"/>
                    </b-col>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import StudentsTable from './components/StudentsTable.vue';
import AddStudentForm from './components/AddStudentForm.vue';
import EditStudentForm from './components/EditStudentForm.vue';
import StudentsFilter from './components/StudentsFilter.vue';

import AddEducationForm from './components/education/AddEducationForm.vue';
import EditEducationForm from './components/education/EditEducationForm.vue';
import EducationsTable from './components/education/EducationsTable.vue';
import EducationsFilter from './components/education/EducationsFilter.vue';

import { EducationsModel } from './services/models/educations.js';
import { StudentsModel } from './services/models/students.js';

export default {
    name: 'App',
    components: {
        StudentsTable,
        AddStudentForm,
        EditStudentForm,
        StudentsFilter,

        AddEducationForm,
        EditEducationForm,
        EducationsTable,
        EducationsFilter
    },
    data() {
        return {
            students: [],
            educations: [],

            filteredEducations: [],
            filteredStudents: [],

            selectedEducation: {},
            selectedStudent: {}
        }
    },
    async created() {
        await this.refreshData();
    },
    methods: {
        async refreshData() {
            const studentsModelInstance = new StudentsModel();
            const educationsModelInstance = new EducationsModel();

            this.students = await studentsModelInstance.getAllStudents();
            this.educations = await educationsModelInstance.getAllEducations();

            this.filteredEducations = this.educations;
            this.filteredStudents = this.students;
        },
        setEducations(filteredEducations) {
            console.log(filteredEducations);
            this.filteredEducations = filteredEducations;
        },
        setStudents(filteredStudents) {
            console.log(filteredStudents);
            this.filteredStudents = filteredStudents;
        },

        selectEducation(selectedEducation) {
            this.filteredStudents = this.students;
            this.selectedEducation = selectedEducation;
            console.log(this.selectedEducation);
            this.filteredStudents = this.filteredStudents.filter(student => {
                return student.education === this.selectedEducation._id;
            });
        },
        selectStudent(selectedStudent) {
            this.selectedStudent = selectedStudent;
        }
    }
}
</script>

<style>
html,body
{   
    overflow-x: hidden; 
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    height: 100vh;
}

.tab-content {
    height: 100%;
}
</style>
