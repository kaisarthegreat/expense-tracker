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



const CategorizedExpenses = computed(() => {
    const grouped = {}
    props.data
    .filter(txn => txn.transaction === 'expense')
    .forEach((expense) => {
        const month = dayjs(props.curDate).format("YYYY-MM")
        const expenseMonth = dayjs(expense.date).format("YYYY-MM")
        if (expenseMonth === month) {
            if (!grouped[expense.category]) {
                grouped[expense.category] = 0
            }
            grouped[expense.category] += parseFloat(expense.amount)
        }
    })
    return grouped
})

// console.log(CategorizedExpenses)





</script>


<template>
    <div class="wrapper">
        <h3>Categorized Expenses for {{ dayjs(curDate).format("MMM, YYYY") }}</h3>

        <table class="center">
            <tr v-for="amount, category in CategorizedExpenses" :category>
                <td>{{ category }}</td>
                <td class="right">{{ amount }}</td>
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