<script setup lang="ts">
import {onMounted, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'

const result = ref('')
const fontSize = ref(15)


const getMessage = async (message: string) => {
  console.log('Clearing result')
  result.value = ''
  console.log('Setting result to:', message)
  
  result.value = message
}

onMounted(() => {
  window.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
      fontSize.value++
    } else {
      fontSize.value--
    }
  })

  window.addEventListener('keydown', (event) => {
    const key = event.key
    if (key == 'Escape') {
      fontSize.value = 15
    }
  })


})

</script>

<template>
  <header>
    <div class="flex justify-center items-center h-screen flex-col space-y-9">
      <div v-if="!result" class="flex">
        <img alt="Vue logo" class="logo" src="@/assets/brain.png" width="125" height="125" />
      </div>

      <h1 v-if="!result" class="font-bold text-xl text-gray-600">
        Hello, sir. How can I help you?
      </h1>

      <div v-if="!result" class="max-w-[40rem]">
        <SearchBar @trigger="getMessage" />
        
      </div>

      <div
        v-if="result"
        class="border border-gray-300 rounded-xl w-fit max-w-[70%] h-fit overflow-y-scroll p-4 max-h-[95%]"
      >
        <div class="flex flex-row space-x-2">
          <div class="p-2 w-full" :style="{ 'font-size': fontSize + 'px' }">
            <highlightjs class="text-balance" autodetect :code="result" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>

</style>
