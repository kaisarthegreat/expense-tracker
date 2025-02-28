<script setup>

import { ref, computed } from 'vue'

import dayjs from 'dayjs'

const emit = defineEmits(['transactionDeleted'])
const props = defineProps({    
    data: {
        type: Array,
        required: true,
    },
    curDate: {
        type: String,
        required: true,
    }
})

const updatedData = computed(() => {
    const thisDay = dayjs(props.curDate).format("YYYY-MM-DD")
    return props.data.filter(txn => dayjs(txn.date).format("YYYY-MM-DD") === thisDay)
})

const deleteTransaction = (transaction) => {
    emit('transactionDeleted', transaction)
}





</script>


<template>
    <div class="wrapper">
        <h3>Expenses on {{ dayjs(curDate).format("MMM DD, YYYY") }}</h3>

        <table class="center">
            <tr v-for="data in updatedData" :key="data.id"
                :class="data.transaction === 'income' ? 'income' : 'expense'"
            >
                <td>{{ data.category }}</td>
                <td class="right">{{ data.amount }}</td>
                <td>
                    <button @click="deleteTransaction(data)">x</button>
                </td>

            </tr>
        </table>  
        

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
.income {
    color: green;
}
.expense {
    color: red;
}
button {
    color: red;
}


td {
    text-align: left;
    padding: 1px 20px 1px 20px;
}
.center {
    margin-left: auto;
    margin-right: auto;
}
.right {
    text-align: right;
}

</style>