<template>
    <div
        class="container-fluid"
    >
        <b-button
            v-b-modal.form-model
            variant="primary"
            class="mt-4"
        >
            + Add Student
        </b-button>

        <b-modal
            id="form-model"
            title="Add Student"
            @ok="localAddStudent"
        >
            <b-input
                type="text"
                placeholder="Enter full name"
                class="mb-3"
                v-model="name"
            ></b-input>

            <b-input
                type="number"
                placeholder="Enter phone"
                class="mb-3"
                v-model="phone"
            ></b-input>

            <b-input
                type="text"
                placeholder="E-mail"
                class="mb-3"
                v-model="facebook"
            ></b-input>

            <b-input
                type="text"
                placeholder="position"
                class="mb-3"
                v-model="position"
            ></b-input>

            <b-input
                type="text"
                placeholder="Company Title"
                class="mb-3"
                v-model="company_title"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Region"
                class="mb-3"
                v-model="region"
            ></b-input>

            <b-input
                type="text"
                placeholder="Field Of Activity"
                class="mb-3"
                v-model="field_of_activity"
            ></b-input>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="not_employed"
            >
                Not Employed
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="full_time"
            >
                Full Time
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="unavailable_to_employ"
            >
                Unavailable To Employ
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="mb-3"
                v-model="business_started"
            >
                Business Started
            </b-form-checkbox>

            <b-input
                type="text"
                placeholder="Achievements"
                class="mb-3"
                v-model="achievements"
            ></b-input>

            <b-input
                type="text"
                placeholder="Information Source"
                class="mb-3"
                v-model="information_source"
            ></b-input>
        </b-modal>
    </div>
</template>

<script>

export default {
    name: "AddStudentForm",
    props: {
        addStudent: Function
    },
    data() {
        return {
            name: null,
            phone: null,
            facebook: null,
            position: null,
            company_title: null,
            region: null,
            field_of_activity: null,
            not_employed: null,
            full_time: false,
            unavailable_to_employ: false,
            business_started: false,
            achievements: null,
            information_source: null
        }
    },
    methods: {
        localAddStudent() {
            this.addStudent({
                name: this.name,
                phone: this.phone,
                facebook: this.facebook,
                position: this.position,
                company_title: this.company_title,
                region: this.region,
                field_of_activity: this.field_of_activity,
                not_employed: this.not_employed,
                full_time: this.full_time,
                unavailable_to_employ: this.unavailable_to_employ,
                business_started: this.business_started,
                achievements: this.achievements,
                information_source: this.information_source
            });
        }
    }
}
</script>