import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'dash',
    entry: '//localhost:7802',
    container: '#cnbi-viewport',
    activeRule: '/dash'
    // props: { data: { store, router } }
  }
])

start()
