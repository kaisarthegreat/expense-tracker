<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    }
})

const income = () => {
    return props.data
    .filter((trn) => trn.transaction === 'income')
    .reduce((acc, trn) => {
        return acc + parseFloat(trn.amount)
    }, 0
    )
}

const expense = () => {
    return props.data
    .filter((trn) => trn.transaction === 'expense')
    .reduce((acc, trn) => {
        return acc + parseFloat(trn.amount)
    }, 0
    )
}


const balance = computed(() => {
    return income() - expense()    
})



</script>



<template>
    <div class="wrapper">
        <h3 :class="balance<0 ? 'red' : 'green'">&#8377;{{ balance }}</h3>
    </div>
    
   

   
</template>

<style scoped>
.wrapper {
    background-color: rgb(250, 250, 250);
    color: rgb(0, 0, 0);
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    border-radius: 25px;
}


.red {
    font-weight: 600;
    color: red;
}
.green {
    font-weight: 600;
    color: green;
}
</style>