import App from './App.vue'
import '~/libs/http'
import 'uno.css'
import useModules from '~/libs/useModules'

const app = createApp(App)

app.use(useModules).mount('#app')
