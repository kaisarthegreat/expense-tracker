<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'


const emit = defineEmits(['datePicker'])
const displayDatepicker = ref(false)

const displayDate = ref('')
displayDate.value = dayjs().format("MMM DD, YYYY")

const pickedDate = ref('')

const dateChanger = () => {
    displayDate.value = dayjs(pickedDate.value).format("MMM DD, YYYY")
    emit('datePicker', pickedDate.value)
}



</script>


<template>
    <div class="wrapper">  
        <div class="flexcontainer">
            <h3>{{ displayDate }}</h3>
            <button @click="displayDatepicker=!displayDatepicker">&#9637;</button>
        </div>

        

        <form v-if="displayDatepicker" @submit.prevent="dateChanger">
            <input type="date" v-model="pickedDate">
            <button type="submit">OK</button>

        </form>
        
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

h3 {
    font-weight: 600;
}

.flexcontainer {
    display: flex;
    justify-content: center;
    
}

form {
    margin-top: 10px;
}

button {
    margin-left: 5px;
    color: rgb(0, 0, 0);
    border-radius: 25px;
    background-color: rgb(250, 250, 250);
}

input {
    background-color: rgb(250, 250, 250);
    border-radius: 25px;
    width: 150px;
    text-align: center;
    font-size: 15px;
}
</style>