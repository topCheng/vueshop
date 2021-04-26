<template>
    <button :type="type" class="btn" @click="handleClick()"><slot></slot></button>
</template>

<script>
    export default {
        name: "my-button",
        props: {
            type: {
                type: String,
                default: "button"
            }
        },
        methods: {
            handleClick() {
                this.$emit("click");
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: blue;
        color: #fff;
        outline: none;
        border: 0 none;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
</style>