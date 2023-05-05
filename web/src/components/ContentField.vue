<template>
    <div class="container content-field">
        <div class="card card-style ">
            <div class="card-boby"> 
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
div.content-field {
    margin-top: 20px;
}

div.card {
    justify-content: center;
    height: 50px;
}

div.card-boby {
    margin-left:10px;
}
</style>