<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { suggestions } from '@/data/suggestions';
import gsap from 'gsap';

const mounted = ref(false);

const data = ref<{title: string, icon: string, color: string}[]>(suggestions);

const possiblePrompts = ref<{prompt: string}[]>([]);

const computedList = computed(() => {
    return data.value.filter(() => mounted.value);
});

onMounted(() => {
    setTimeout(() => mounted.value = true, 200);
});

const clickSuggestion = (title: string) => {
    if (title == "More") {

        data.value = data.value.filter((item: {[key: string]: string}) => item.title != "More");
        

        data.value = [...data.value, 
            {title: 'Analyse data', icon: 'md-analytics-outlined', color: 'text-indigo-700'},
            {title: 'Surprise me', icon: 'gi-gift-of-knowledge', color: 'text-lime-700'}, 
            {title: 'Brainstorm', icon: 'ai-ideas-repec', color: 'text-amber-700'},
            {title: 'Get advice', icon: 'la-graduation-cap-solid', color: 'text-cyan-700'}
        ];

    };


}

const onBeforeEnter = (el: Element) => {
    const element = el as HTMLElement;
    element.style.opacity = '0';
    element.style.height = '0';
};

const onEnter = (el: Element, done: () => void) => {
    const element = el as HTMLElement;
    const index = element.dataset.index ? parseFloat(element.dataset.index) : 0;
    gsap.to(element, {
        opacity: 1,
        height: '1.6em',
        delay: index * 0.15,
        onComplete: done
    });
};

const onLeave = (el: Element, done: () => void) => {
    const element = el as HTMLElement;
    const index = element.dataset.index ? parseFloat(element.dataset.index) : 0;
    gsap.to(element, {
        opacity: 0,
        height: 0,
        delay: index * 0.15,
        onComplete: done
    });
};

</script>

<template>
          <TransitionGroup
            tag="ul"
            @before-enter="onBeforeEnter" 
            @enter="onEnter" 
            @leave="onLeave" class="flex flex-wrap justify-center gap-2 text-sm text-gray-500 mt-6 min-h-[100px] max-h-[100px]">
            <li 
            class="bg-white rounded-full border-black/15 border px-5 py-5 justify-center items-center flex" v-for="(suggestion, index) in computedList" :key="index" :data-index="index">
            <v-icon :class="`${suggestion.color} mr-2`" :name="`${suggestion.icon}`"/>
            <button @click="clickSuggestion(suggestion.title)" class="hover:text-gray-800">{{ suggestion.title }}</button>
               
          </li>
          <div v-if="possiblePrompts">
            <div v-for="(item, index) in possiblePrompts" :key="index">
                {{ item.prompt }}
            </div>
        </div>
        </TransitionGroup>
        
</template>