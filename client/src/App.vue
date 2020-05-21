<template>
    <div id="app">
        <b-tabs
            class="h-100"
        >
            <b-tab
                title="Выпуски"
                class="h-100"
            >
                <div
                    class="row h-100"
                >
                    <b-col
                        sm="2"
                        class="border-right h-100 pl-4"
                    >
                        <b-alert
                            v-if="selectedEducation._id"
                            show
                        >
                            Выбранный выпуск: {{ selectedEducation.educationProgramTitle }}
                        </b-alert>
                        <b-button
                            variant="primary"
                            @click="generateDocx"
                            class="mt-3"
                            :disabled="isLoading"
                        >
                            Скачать отчеты
                        </b-button>

                        <AddEducationForm
                            :refreshEducations="refreshData"/>

                        <b-row>
                            <EditEducationForm
                                :refreshEducations="refreshData"
                                :selectedEducation="selectedEducation"
                                class="col"/>

                            <b-button
                                variant="danger"
                                v-b-modal.deleting-education-confirmation
                                class="col mt-4 mr-2"
                                :disabled="!!!selectedEducation._id || isLoading"
                            >
                                Удалить выбранный выпуск
                            </b-button>
                        </b-row>

                        <EducationsFilter
                            :educations="educations"
                            :setEducations="setEducations"/>
                    </b-col>

                    <b-col
                        sm="10"
                        class="h-100"
                    >
                        <Loading
                            v-if="isLoading"
                            class="mt-5"/>
                        <EducationsTable
                            v-if="!isLoading"
                            :educations="filteredEducations"
                            :selectEducation="selectEducation"/>
                    </b-col>
                </div>
            </b-tab>

            <b-tab
                title="Студенты выбранного выпуска"
            >
                <div
                    class="row h-100"
                >
                    <b-col
                        sm="2"
                        class="border-right h-100"
                    >
                        <b-alert
                            v-if="selectedStudent._id"
                            show
                        >
                            Выбранный студент: {{ selectedStudent.name }}
                        </b-alert>

                        <b-button
                            variant="primary"
                            @click="generateDocx"
                            class="mt-3"
                            :disabled="isLoading"
                        >
                            Скачать отчеты
                        </b-button>

                        <AddStudentForm
                            :educations="educations"
                            :refreshStudents="refreshData"/>

                        <b-row>
                            <EditStudentForm
                                :educations="educations"
                                :refreshStudents="refreshData"
                                :selectedStudent="selectedStudent"
                                class="col"/>

                            <b-button
                                variant="danger"
                                :disabled="!!!selectedStudent._id"
                                v-b-modal.deleting-student-confirmation
                                class="col mt-4 mr-2"
                            >
                                <span
                                    v-if="!isLoading"
                                >
                                    Удалить выбранного студента
                                </span>

                                <Loading
                                    v-if="isLoading"/>
                            </b-button>
                        </b-row>
                        
                        <StudentsFilter
                            :students="students"
                            :setStudents="setStudents"
                            :generateDocx="generateDocx"/>
                    </b-col>

                    <b-col
                        sm="10"
                        class="h-100"
                    >
                        <Loading
                            v-if="isLoading"
                            class="mt-5"/>
                        <StudentsTable
                            v-if="!isLoading"
                            :students="filteredStudents"
                            :selectStudent="selectStudent"/>
                    </b-col>

                    <b-modal
                        id="deleting-student-confirmation"
                        title="Удаление студента"
                        @ok="deleteSelectedStudent"
                        :cancelTitleHtml="'Отмена'"
                    >
                        Вы действительно хотите удалить этого студента?
                    </b-modal>

                    <b-modal
                        id="deleting-education-confirmation"
                        title="Удаление выпуска"
                        @ok="deleteSelectedEducation"
                        :cancelTitleHtml="'Отмена'"
                    >
                        Вы действительно хотите удалить этот выпуск?
                    </b-modal>
                </div>
            </b-tab>
        </b-tabs>

        <b-modal
            id="confirmation-modal"
        >
            Вы действительно хотите удалить эту запись?
        </b-modal>
    </div>
</template>

<script>
import Loading from './components/Loading.vue';

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
import { DocxModel } from './services/models/docx.js';
import { DownloadModel } from './services/models/download.js';

export default {
    name: 'App',
    components: {
        Loading,

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
            selectedStudent: {},

            isLoading: true
        }
    },
    async created() {
        await this.refreshData();
    },
    methods: {
        async refreshData() {
            this.isLoading = true;
            const studentsModelInstance = new StudentsModel();
            const educationsModelInstance = new EducationsModel();

            this.students = await studentsModelInstance.getAllStudents();
            this.educations = await educationsModelInstance.getAllEducations();

            this.filteredEducations = this.educations;
            this.filteredStudents = this.students;

            this.isLoading = false;
        },
        setEducations(filteredEducations) {
            this.filteredEducations = filteredEducations;
        },
        setStudents(filteredStudents) {
            this.filteredStudents = filteredStudents;
        },

        selectEducation(selectedEducation) {
            this.filteredStudents = this.students;
            this.selectedEducation = selectedEducation;
            this.filteredStudents = this.filteredStudents.filter(student => {
                return student.education === this.selectedEducation._id;
            });
        },
        selectStudent(selectedStudent) {
            this.selectedStudent = selectedStudent;
        },

        async generateDocx() {
            this.isLoading = true;

            const educationsToPrint = this.filteredEducations.map(education => {
                const educationCopy = Object.assign({}, education);
                delete educationCopy._id;
                delete educationCopy.__v;
                delete educationCopy.year;
                delete educationCopy.grade;

                return educationCopy;
            });

            const studentsToPrint = this.filteredStudents.map(student => {
                const studentCopy = Object.assign({}, student);
                delete studentCopy._id;
                delete studentCopy.__v;
                delete studentCopy.education;

                return studentCopy;
            });

            const docxModelInstance = new DocxModel();
            await docxModelInstance.generateDocx(educationsToPrint, studentsToPrint);

            const downloadModelInstance = new DownloadModel();
            await downloadModelInstance.downloadDocx();

            this.isLoading = false;
        },

        async deleteSelectedEducation() {
            this.isLoading = true;
            const educationsModelInstance = new EducationsModel(this.selectedEducation._id);

            await educationsModelInstance.deleteEducation();
            await this.refreshData();
            this.isLoading = false;
        },
        async deleteSelectedStudent() {
            this.isLoading = true;
            const studentsModelInstance = new StudentsModel(this.selectedStudent._id);

            await studentsModelInstance.deleteStudent();
            await this.refreshData();
            this.isLoading = false;
        }
    }
}
</script>

<style>
html {
    font-size: 14px;
}

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
