<template>
  <sm-card class="home">
    <div class="home__card">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld :title="companyName"></HelloWorld>

      <nav>
        <router-link to="/configuration">Page 1</router-link> |
        <router-link to="/configuration/about">Page 2</router-link> |
      </nav>

      <div class="home__form">
        <sm-input :label="$transF('name')" size="small" />
        <sm-input :label="$transF('email')" size="small" />
      </div>

      <router-link to="/configuration/about">
        <sm-button type="primary">
          {{ $transF('submit') }}
        </sm-button>
      </router-link>
    </div>
  </sm-card>
</template>

<script setup lang="ts">
import { SmCard, SmInput, SmButton } from '@alegradev/smile-ui-next'
import { useSessionStore } from 'app_alegra_commons/session'
import HelloWorld from '../components/HelloWorld.vue'
import { $transF } from 'app_alegra_commons/translate'
import { computed } from 'vue'

const SESSION = useSessionStore()

const companyName = computed(() => SESSION.company.name)
</script>

<style lang="scss" scoped>
.home {
  &__card {
    @apply p-4;
    @apply flex items-center flex-col;
  }
  &__form {
    @apply grid grid-cols-2 gap-2;
    @apply my-5;
  }
  img {
    @apply w-24 h-24;
  }
}
</style>
