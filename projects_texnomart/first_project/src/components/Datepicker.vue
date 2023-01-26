<template>
    <div>
        <Datepicker @update:modelValue="emitDate()" v-model="date" locale="ru" cancelText="Отмена" selectText="Выбрать"
            :min-date="new Date()" :enable-time-picker="false" />
    </div>
</template>

<script setup>
// import { ref } from 'vue'
// import Datepicker from '@vuepic/vue-datepicker'
// import '@vuepic/vue-datepicker/dist/main.css'

// const date = ref(this.mainDate);
</script>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    data() {
        return {
            date: new Date()
        }
    },
    methods: {
        emitDate() {
            this.$emit('mainDate', this.date)
        }
    }
}
</script>