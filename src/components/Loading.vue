<template>
    <div class="d-flex justify-content-center align-items-center">
        <b-spinner variant="primary" />
        <h5
            v-if="isTextPresent" 
            class="text-secondary ml-4"
        >
            <slot>Loading...</slot>
        </h5>
    </div>
</template>

<script>
export default {
    name: "Loading",
    props: {
        isTextPresent: Boolean
    }
};
</script>
