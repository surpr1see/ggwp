<template>
    <div>
        <b-table
            striped
            hover 
            :items="students"
            bordered
            class="regular-text"
        >
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'StudentsTable',
    props: {
        students: Array
    }
}
</script>

<style scoped>
    .regular-text {
        font-size: 0.85rem;
    }
</style>