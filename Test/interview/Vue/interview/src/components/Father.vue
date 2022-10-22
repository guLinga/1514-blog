<template>
  <Children :value.sync="value"/>
</template>

<script>
import Children from './Children.vue';
export default {
 name: 'Father',
 components: {
  Children
 },
 data(){
  return {
    value: 1
  };
 }
}
</script>

<style>

</style>