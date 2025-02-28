<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

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


const expenseTotal = computed(() => {
    
    const thisMonth = dayjs(props.curDate).format("YYYY-MM")
    return props.data
    .filter(txn => dayjs(txn.date).format("YYYY-MM") === thisMonth)
    .filter(txn => txn.transaction === 'expense')
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0)
    .toFixed(2) 

})

const incomeTotal = computed(() => {
    const thisMonth = dayjs(props.curDate).format("YYYY-MM")
    return props.data
    .filter(txn => dayjs(txn.date).format("YYYY-MM") === thisMonth)
    .filter(txn => txn.transaction === 'income')
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0)
    .toFixed(2)
})





</script>



<template>
    <div class="wrapper">

        <h3>Savings for {{ dayjs(curDate).format("MMM, YYYY") }}</h3>

        <table class="center">
            <thead>
                <tr>
                    <th>Income</th>
                    <th>Expense</th>
                    <th>Savings</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ incomeTotal }}</td>
                    <td>{{ expenseTotal }}</td>
                    <td
                        :class="incomeTotal-expenseTotal<0  ?'expense' : 'income'"
                    >
                        {{ incomeTotal-expenseTotal }}
                    </td>
                </tr>
            </tbody>
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
.center {
    margin-left: auto;
    margin-right: auto;
}
td {
    text-align: left;
    padding: 1px 20px 1px 20px;
}

</style>