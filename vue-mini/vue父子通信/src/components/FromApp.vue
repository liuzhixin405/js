<template>
 <div class="hello">
 <h1>Change</h1>
 <h1>{{ message }}</h1>
 <button @click="changeMessage">Change Message</button>
 <p>来自爸爸的问候: {{ greeting }}</p>
 </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'click me'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Hello, Goodbye!';
    }
  
  },
  props: {
    greeting: String
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>