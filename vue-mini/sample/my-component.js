import {ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    setup(){
        const count = ref(0);
        return {count}
    },
    template: `
        <div>
            <p>Count: {{ count }}</p>
            <button @click="count++">Increment</button>
        </div>
    `   
}