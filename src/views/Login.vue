<template>
  <div>
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="handelSubmit" type="button">submit</button>
  </div>
</template>

<script>
import { login } from "@/sevices/commonServices/auth";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handelSubmit() {
      const res = await login(this.username, this.password);
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>