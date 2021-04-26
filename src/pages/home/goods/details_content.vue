<template>
    <div class="page">
        <div class="content" v-html="$store.state.goods.details.bodys">

        </div>
    </div>
</template>

<script>
    export default {
        name: "details_content"
    }
</script>

<style scoped>
    .page {
        margin-top: 1.2rem;
    }

    .content {
        width: 90%;
        margin: 0 auto;
        font-size: .32rem;
        line-height: .5rem;
    }
</style>