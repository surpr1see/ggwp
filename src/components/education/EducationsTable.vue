<template>
    <div
        class="py-4"
    >
        <b-table
            hover 
            :fields="fields"
            :items="educations"
            bordered
            class="regular-text"
            @row-clicked="selectEducation"
        >
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'EducationsTable',
    props: {
        educations: Array,
        selectEducation: Function
    },
    computed: {
        fields() {
            const fields = [];

            if(this.educations.length) {
                const tempEducation = this.educations[0];
                const keys = Object.keys(tempEducation);
                keys.forEach(key => {
                    if(key !== '_id' &&
                        key !== '__v' &&
                        key !== 'year' &&
                        key !== 'grade') 
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