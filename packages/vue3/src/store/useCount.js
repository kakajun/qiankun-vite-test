import { defineStore } from 'pinia'
const useCount = defineStore('useCount', {
  state: {
    count: 0,
  },
  getters: {
    evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd'),
  },
  actions: {
    increment: () => this.count++,
    decrement: () => this.count--,
    incrementIfOdd() {
      if ((this.count + 1) % 2 === 0) {
        this.increment();
      }
    },
    incrementAsync() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.increment();
          resolve();
        }, 1000);
      });
    },
  },
})
export default useCount
