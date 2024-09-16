<template>
  <v-footer app color="primary" height="64" class="footer">
    <v-container class="text-center white--text">
      <slot>
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="4"
        />
      </slot>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
