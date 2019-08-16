<template>
  <v-footer
    class="font-weight-medium"
  >
    <div class="footer">
      <v-spacer>  </v-spacer>
      {{ new Date().getFullYear() }} — FacilitaJus
    </div>
  </v-footer>
</template>

<script>
export default {

};
</script>

<style>
  .footer {
    display: flex;
    width: 100%;
    padding-right: 10px;
  }
</style>
