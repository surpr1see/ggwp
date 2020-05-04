<template>
    <div
        class="py-4"
    >
        <b-alert
            v-if="!students.length"
            show
            class="mt-2"
        >
            Студенты для отображения отсутствуют
        </b-alert>

        <b-table
            hover
            :items="students"
            :fields="fields"
            bordered
            class="regular-text"
            @row-clicked="selectStudent"
        >
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'StudentsTable',
    props: {
        students: Array,
        selectStudent: Function
    },
    computed: {
        fields() {
            const fields = [];

            if(this.students.length) {
                const tempEducation = this.students[0];
                const keys = Object.keys(tempEducation);
                keys.forEach(key => {
                    if(key !== '_id' &&
                        key !== '__v' &&
                        key !== 'education') 
                    {
                        fields.push({
                            key,
                            sortable: true
                        })
                    }
                });
            }

            return fields;
        }
    }
}
</script>

<style scoped>
    .regular-text {
        font-size: 0.85rem;
    }
</style>