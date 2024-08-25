<template>
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="ShowMessage">SHowMessage Message</button>
  <From greeting="Welcome to My Vue.js App" />

  <To @data-from-child="handleDataSent" />
  <p>Data from child: {{ receivedData }}</p>
</div>
</template>

<script>
import From from './components/FromApp.vue'
import To from './components/ToApp.vue'

export default {
  name: 'App',
  components: {
    From,
    To,
  },
  data() {
    return {
      message: 'Hello guys!',
      receivedData: '',
    };
  },
    methods: {
      ShowMessage() {
        this.message = this.message.split('').reverse().join('');
      },
      handleDataSent(data) {
        console.log('Data sent from child:', data);
        this.receivedData = data;
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
