<template>
  <v-app>
    <v-container
      class="fill-height d-flex justify-center align-center text-center"
      fluid
    >
      <v-row>
        <v-col>
          <div class=" text-h3 ">
            <p>ページが見つかりませんでした</p>
            <br/>
          </div>
          <v-img
            src="/src/images/notfound/Not_Found.png"
            alt="404 Not Found"
            max-width="500"
            class="mx-auto"
          ></v-img>
          <v-typography variant="h4" class="mt-5">
            <br/>
            <p class="">
              Oops! The page you're looking for isn't here.
            </p>
            <p class="">
              おっと！探しているページはここにはありません。
            </p>
          </v-typography>
          <v-btn class="mt-5" color="primary" @click="goHome">
            Go Back Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
