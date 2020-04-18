<template>
    <div
        class="mt-4 mb-4"
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
            ></b-input>

            <b-input
                type="number"
                placeholder="Enter phone"
                v-model="phone"
                class="mb-3"
            ></b-input>

            <b-input
                type="text"
                placeholder="E-mail"
                v-model="facebook"
                class="mb-3"
            ></b-input>

            <b-input
                type="text"
                placeholder="Position"
                v-model="position"
                class="mb-3"
            ></b-input>

            <b-input
                type="text"
                placeholder="Company Title"
                v-model="company_title"
                class="mb-3"
            >
            </b-input>

            <b-input
                type="text"
                placeholder="Region"
                v-model="region"
                class="mb-3"
            ></b-input>

            <b-input
                type="text"
                placeholder="Field Of Activity"
                v-model="field_of_activity"
                class="mb-3"
            ></b-input>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="not_employed"
            >
                Not Employed
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="full_time"
            >
                Full Time
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="unavailable_to_employ"
            >
                Unavailable To Employ
            </b-form-checkbox>

            <b-form-checkbox
                value="true"
                unchecked-value="false"
                class="d-flex align-items-center justify-content-center mb-3"
                v-model="business_started"
            >
                Business Started
            </b-form-checkbox>

            <b-input
                type="text"
                placeholder="Achievements"
                v-model="achievements"
                class="mb-3"
            ></b-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "StudentsFilter",
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
            achievements: null
        }
    }
}
</script>