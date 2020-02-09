<template>
  <div id="app">
    <message> Hello There </message>
    <message> You seem to be using the Vue CLI.</message>
    <message> It's pretty nifty isn't it?</message>
  </div>
</template>

<script>
import Message from './components/Message.vue';

export default {
  name: 'app',
  components: { Message},
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
