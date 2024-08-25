<template>
 <div>
   <h2>This is a child component</h2>
   <button @click="sendDataToParent">Send Data</button>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  
  methods: {
  
    sendDataToParent() {
      console.log('发送数据给父组件');
      this.$emit('data-from-child', '来自儿子的问候: 你好,爸爸！');
    }
  },
 
}
</script>
<style scoped>
h1 {
  color: #42b983;
}
</style>