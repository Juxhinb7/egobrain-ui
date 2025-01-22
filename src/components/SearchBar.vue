<script setup lang="ts">
import axios from 'axios'
import { computed, ref } from 'vue'

const emit = defineEmits(['trigger']);

const prompt = ref('')
const apiKey = ref('');
const output = ref('')
const loading = ref(false)
const message = ref('');

const disabled = computed(() => {
  return prompt.value != '' && apiKey.value != '' ? false : true
})

const disabledOnLoading = computed(() => {
  return loading.value ? true : false
})


const submitPrompt = async () => {
  output.value = ''
  console.log(apiKey.value);

  const json = JSON.stringify({ prompt: prompt.value, apiKey: apiKey.value })
  loading.value = true;
  
  const response = await axios.post('https://egobrain-production.up.railway.app/streaming', json, {
  responseType: 'stream',
  headers: {
    'Content-Type': 'application/json',
    },
  })

    const stream = await response.data

    for await (const chunk of stream) {
      output.value += chunk
    }

    emit('trigger', output.value)
    loading.value = false
  
 
}
 
</script>

<template>
  <Transition name="bounce" appear>
    <form @submit.prevent="submitPrompt" autocomplete="off" class="max-h-[200px]">
    <div class="mx-auto w-[25rem] sm:w-[40rem] bg-gray-100 h-20 rounded-xl flex">
      <input
      v-model="prompt"
      type="text"
      id="prompt"
      name="prompt" 
      class="p-6 w-[38rem] outline-none mx-auto block bg-transparent"
      placeholder="Enter a prompt here"
    />

    </div>
    
    <div class="mx-auto w-[25rem] sm:w-[40rem] bg-gray-100 h-20 rounded-xl flex mt-4">
      <input v-model="apiKey" name="apiKey" type="text" class="p-6 w-[38rem] outline-none mx-auto block bg-transparent" placeholder="Enter api key here" />
    </div>

    <div class="flex justify-center items-center mt-4">
      <v-icon
        v-if="loading"
        name="pr-spinner"
        animation="spin"
        speed="slow"
        scale="1.4"
        label="loading icon"
        color="orange"
        class="absolute mr-32"
      />
    <button type="submit" class="p-2 flex bg-red-100 rounded-md" :disabled="disabled || disabledOnLoading" style="">
      Send
      <v-icon name="md-send-outlined" scale="1.4" label="Send icon" class="ml-2" />
    </button>
  </div>


    <p class="text-center bg-red-200 rounded-lg mt-4">
      {{ message }}
    </p>
    
    </form>
  </Transition>
</template>

<style scoped>
button:disabled {
  color: gray;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
