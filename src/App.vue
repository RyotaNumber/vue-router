<script>
import { RouterLink, RouterView } from 'vue-router'
import router_menu from '/src/router/router_const.js'

export default {
  data(){
    return{
      drawer:false,
      menulist:router_menu,
      title:""
    }
  },
  watch:{
    $route(to){
      this.updateTitle(to)
    }
  },
  created(){
    this.updateTitle(this.$route)
  },
  methods:{
    updateTitle(route){
      this.title = route.name
    }
  }
}
</script>

<template>
  <v-app>
    <v-app-bar
      dense
      elevation="0"
      color="primary"
    >
      <v-app-bar-nav-icon
        class=" py-4"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        {{title}}
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
    >
      <v-list nav>
        <v-list-item
          link
          v-for="item in menulist"
          :href="item.href"
          :key="item.title"
        >
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>


    <RouterView />


  </v-app>
</template>

<style scoped>
</style>
