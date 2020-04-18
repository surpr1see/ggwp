<template>
    <div id="app">
        <div
            class="row h-100"
        >
            <b-col
                sm="3"
                class="border-right h-100"
            >
                <AddStudentForm
                    :addStudent="addStudent"/>
                <StudentsFilter/>
            </b-col>

            <b-col
                sm="9"
                class="h-100"
            >
                <StudentsTable
                    :students="students"/>
            </b-col>
        </div>
    </div>
</template>

<script>
import StudentsTable from './components/StudentsTable.vue';
import AddStudentForm from './components/AddStudentForm.vue';
import StudentsFilter from './components/StudentsFilter.vue';

export default {
    name: 'App',
    components: {
        StudentsTable,
        AddStudentForm,
        StudentsFilter
    },
    data() {
        return {
            students: [
                {
                    name: "Temp Name",
                    phone: "3800000000",
                    facebook: "tempname@gmail.com",
                    position: "",
                    company_title: "",
                    region: "",
                    field_of_activity: "",
                    not_employed: "",
                    full_time: "",
                    unavailable_to_employ: false,
                    business_started: false,
                    achievements: "",
                    information_source: ""
                },
                {
                    name: "Temp Name",
                    phone: "3800000000",
                    facebook: "tempname@gmail.com",
                    position: "",
                    company_title: "",
                    region: "",
                    field_of_activity: "",
                    not_employed: "",
                    full_time: "",
                    unavailable_to_employ: false,
                    business_started: false,
                    achievements: "",
                    information_source: ""
                }
            ]
        };
    },
    methods: {
        addStudent(student) {
            this.students.push(student);
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    height: 100vh;
}
</style>
