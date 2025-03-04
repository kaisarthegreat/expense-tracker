<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

import HelloWorld from './components/HelloWorld.vue'
import Date from './components/Date.vue'
import Balance from './components/Balance.vue'
import AmountInput from './components/AmountInput.vue'
import TodayExpenses from './components/TodayExpenses.vue'
import MonthlyTotal from './components/MonthlyTotal.vue'
import CategorizedExpenses from './components/CategorizedExpenses.vue'

import { db } from './db'

const curDate = ref('')
curDate.value = dayjs()

const data = ref([])

const loadData = async () => {
  data.value = await db.transData.toArray()
}

onMounted(loadData)


const handleTransactionSubmitted = async (transactionData) => {
  await db.transData.put(JSON.parse(JSON.stringify(transactionData)))
  loadData()
}

const handleTransactionDeleted = async (transaction) => {
  await db.transData.delete(transaction.id)
  loadData()

}

const handleDatePicker = (pickedDate) => {
  curDate.value = dayjs(pickedDate)
}


// console.log("from app to display env value: ", import.meta.env.VITE_SOME_KEY)
// console.log("from app to display database env value: ", import.meta.env.DB_PASSWORD)

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50" />

    <div class="wrapper">
      <HelloWorld msg="Expense Tracker" />
    </div>
  </header>

  <main>
    <Date @datePicker="handleDatePicker" />
    <Balance :data />
    <AmountInput :curDate @transactionSubmitted="handleTransactionSubmitted" /> 
    <TodayExpenses :data :curDate @transaction-deleted="handleTransactionDeleted" />
    <MonthlyTotal :data :curDate />
    <CategorizedExpenses :data :curDate />
    
  </main>
</template>

<style scoped>
header {
  line-height: 1.2;
}

.logo {
  display: block;
  margin: 0 auto 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
