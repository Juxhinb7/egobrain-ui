import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

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
    LaGraduationCapSolid,
    MdErroroutline } from 'oh-vue-icons/icons'
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
    LaGraduationCapSolid,
    MdErroroutline
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)

app.use(hljsVuePlugin)
app.use(createPinia())

app.mount('#app')
