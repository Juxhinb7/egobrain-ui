import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdSendOutlined, 
    AiFigshare, 
    PrSpinner, 
    LaSpinnerSolid, 
    BiFileEarmarkText, 
    BiPencilSquare, 
    BiFileEarmarkCode,
    AiIdeasRepec,
    MdAnalyticsOutlined,
    GiGiftOfKnowledge,
    BiPlusSquare,
    LaGraduationCapSolid } from 'oh-vue-icons/icons'
import hljsVuePlugin from '@highlightjs/vue-plugin'

addIcons(
    MdSendOutlined, 
    AiFigshare, 
    PrSpinner, 
    LaSpinnerSolid, 
    BiFileEarmarkText, 
    BiPencilSquare,
    BiFileEarmarkCode,
    AiIdeasRepec,
    MdAnalyticsOutlined ,
    GiGiftOfKnowledge,
    BiPlusSquare,
    LaGraduationCapSolid
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)

app.use(hljsVuePlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
