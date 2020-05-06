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
            :items="formattedStudents"
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
            let fields = [];
            if(this.students.length) {
                fields = [
                    {
                        label: 'Прізвище, ім’я, по-батькові',
                        sortable: true,
                        key: 'name'
                    },
                    {
                        label: 'Телефон',
                        sortable: true,
                        key: 'phone'
                    },
                    {
                        label: 'e-mail',
                        sortable: true,
                        key: 'socialProfile'
                    },
                    {
                        label: 'Сторінка у Facebook, LinkedIn',
                        sortable: true,
                        key: 'secondSocialProfile'
                    },
                    {
                        label: 'Посада',
                        sortable: true,
                        key: 'position'
                    },
                    {
                        label: 'Назва підприємства (установи)',
                        sortable: true,
                        key: 'companyTitle'
                    },
                    {
                        label: 'Регіон (область, місто)',
                        sortable: true,
                        key: 'region'
                    },
                    {
                        label: 'Сфера діяльності',
                        sortable: true,
                        key: 'activityField'
                    },
                    {
                        label: 'Незайняті, проте шукають роботу/ не брав участь в опитуванні',
                        sortable: true,
                        key: 'isNotEmployed'
                    },
                    {
                        label: 'Повна зайнятість',
                        sortable: true,
                        key: 'isFullTime'
                    },
                    {
                        label: 'Недоступність для роботи',
                        sortable: true,
                        key: 'isUnavailableToEmploy'
                    },
                    {
                        label: 'Розпочато власний бізнес',
                        sortable: true,
                        key: 'isBusinessStarted'
                    },
                    {
                        label: 'Відзнаки, досягнення',
                        sortable: true,
                        key: 'achievements'
                    },
                    {
                        label: 'Джерело інформації про працевлаштування',
                        sortable: true,
                        key: 'informationSource'
                    }
                ];
            }

            return fields;
        },
        formattedStudents() {
            return this.students.map(stud => {
                const studCopy = Object.assign({}, stud);
                studCopy.isNotEmployed = studCopy.isNotEmployed === true ? '+' : '';
                studCopy.isFullTime = studCopy.isFullTime === true ? '+' : '';
                studCopy.isUnavailableToEmploy = studCopy.isUnavailableToEmploy === true ? '+' : '';
                studCopy.isBusinessStarted = studCopy.isBusinessStarted === true ? '+' : ''; 
                return studCopy;
            });
        }
    }
}
</script>

<style scoped>
    .regular-text {
        font-size: 0.85rem;
    }
</style>