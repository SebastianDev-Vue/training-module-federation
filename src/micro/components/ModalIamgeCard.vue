<script setup lang="ts">
import { ref, computed } from 'vue'
import { SButton } from '@alegradev/smile-ui-next'

const props = defineProps<{
  size: 'small' | 'medium' | 'large'
  title: string
  description: string
  cancelText: string
  succeedText: string
  btnSize?: 'small' | 'medium' | 'large' | undefined
  imageUrl?: string
  isOpen: boolean
}>()

const emits = defineEmits(['handleOpenModal'])

const calculateSize = computed(() => {
  const sizeClasses = {
    small: 'w-[320px]',
    medium: 'w-[480px]',
    large: 'w-[640px]',
  }

  return sizeClasses[props.size] || 'w-[480px]'
})
</script>

<template>
  <article v-if="isOpen" class="bg-white rounded-lg shadow-lg h-auto p-4" :class="calculateSize">
    <img v-if="imageUrl" :src="imageUrl" alt="Modal Image" class="rounded-md mb-4 h-48 w-full" />

    <h2 class="text-lg font-semibold text-slate-900 pb-2">{{ title }}</h2>
    <p class="text-sm font-normal text-slate-700 pb-4 text-start">{{ description }}</p>

    <div
      class="flex items-center justify-end"
      :class="size === 'small' ? 'justify-end' : 'justify-between'"
    >
      <SButton v-if="size !== 'small'" :size="btnSize" emphasis="text" label="Label" />

      <div class="flex items-center gap-2">
        <SButton
          @click="emits('handleOpenModal')"
          :size="btnSize"
          :label="cancelText"
          emphasis="outline"
        />
        <SButton :size="btnSize" :label="succeedText" />
      </div>
    </div>
  </article>
</template>

<style scoped></style>
