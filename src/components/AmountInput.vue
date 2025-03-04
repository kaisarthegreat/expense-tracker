<script setup>
import { ref } from 'vue'
import VueToggles from 'vue-toggles'
import dayjs from 'dayjs'


const amount = ref('')
const date = ref('')
const cat = ref('')
const isChecked = ref(true)
const emit = defineEmits(['transactionSubmitted'])
const props = defineProps({
    curDate: {
        type: String,
        required: true,
    }
})

const onSubmit = ()=> {
    if (!amount.value) return
    if (isNaN(parseFloat(amount.value)) && !isFinite(parseFloat(amount.value))) return
    
    const trnType = isChecked.value ? "expense" : "income"    

    date.value = dayjs(props.curDate)
    const transactionData = {date: date.value, transaction: trnType, 
        category: cat.value, amount: amount.value}

    emit('transactionSubmitted', transactionData)
    amount.value=''
    cat.value=''

    

}


</script>



<template>
    <div class="wrapper">
        <h3>
            Enter 
            {{ isChecked ? 'expense' : 'income' }} 
            on 
            {{ dayjs(curDate).format("MMM DD, YYYY") }}
        </h3>
        <form @submit.prevent="onSubmit">
            <div class="input-amount">

                <VueToggles v-model="isChecked" :height="25" :width="50"
                checkedText="-" 
                uncheckedText="+"
                checkedBg="red"
                uncheckedBg="green"
                />
                
                <input v-model="amount" type="number" min="0" step="0.01" placeholder="0.00" required>
                

            </div>
            
            <div v-if="isChecked">
                <button type="submit" @click="cat='Food'">Food</button>
                <button type="submit" @click="cat='Apparel'">Apparel</button>
                <button type="submit" @click="cat='House'">House</button>
            </div>
            <div v-else>
                <button type="submit" @click="cat='Salary'">Salary</button>
                <button type="submit" @click="cat='Other'">Other</button>

            </div>
            
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
    margin-bottom: 10px;
    font-weight: 600;
}
.input-amount {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

input {
    border-radius: 25px;
    height: 25px;
    margin-left: 5px;
    border-color: blue;
}

button {
    margin: 5px;
    width: 70px;
    color: blue;
    border-radius: 25px;
    border-color: blue;
}
</style>