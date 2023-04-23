import App from './App.vue'
import '~/libs/http'
import 'uno.css'
import useModules from '~/libs/useModules'

const app = createApp(App)

app.use(useModules).mount('#app')
// console.log(import.meta.glob<{ install: any }>('./modules/*.ts', { eager: true }))

// Object.values(import.meta.glob<{ install: any }>('./modules/*.ts', { eager: true })).forEach(i => i.install?.({ app }))

// app.mount('#app')
