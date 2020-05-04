<template>
    <div
        class="py-4"
    >
        <b-alert
            v-if="!educations.length"
            show
            class="mt-2"
        >
            Выпуски отсутствуют в базе данных
        </b-alert>

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
            let fields = [];
            if(this.educations.length) {
                fields = [
                    {
                        label: 'Назва освітньої програми',
                        sortable: true,
                        key: 'educationProgramTitle'
                    },
                    {
                        label: 'Освітній ступінь',
                        sortable: true,
                        key: 'gradeValue'
                    },
                    {
                        label: 'Загальна чисельність випускників',
                        sortable: true,
                        key: 'totalAmountOfGraduates'
                    },
                    {
                        label: 'Загальна чисельність респондентів',
                        sortable: true,
                        key: 'amountOfGraduatesParticipated'
                    },
                    {
                        label: 'Працевлаштовані',
                        sortable: true,
                        key: 'amountOfEmployed'
                    },
                    {
                        label: 'Незайняті, проте шукають роботу',
                        sortable: true,
                        key: 'amountOfUnemployed'
                    },
                    {
                        label: 'Повністю зайняті науковою роботою',
                        sortable: true,
                        key: 'amountOfEmployedInScience'
                    },
                    {
                        label: 'Недоступні для роботи',
                        sortable: true,
                        key: 'amountOfUnavailableToEmploy'
                    },
                    {
                        label: 'Почали свій бізнес',
                        sortable: true,
                        key: 'amountOfStartedBusiness'
                    },
                    {
                        label: 'Присвоєні почесні звання',
                        sortable: true,
                        key: 'amountOfUkraineAchievements'
                    }
                ];
            }

            // if(this.students.length) {
            //     const tempEducation = this.students[0];
            //     const keys = Object.keys(tempEducation);
            //     keys.forEach(key => {
            //         if(key !== '_id' &&
            //             key !== '__v' &&
            //             key !== 'education') 
            //         {
            //             fields.push({
            //                 key,
            //                 sortable: true
            //             })
            //         }
            //     });
            // }

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