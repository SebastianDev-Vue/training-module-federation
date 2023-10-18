<script setup lang="ts">
import ModalImageCard from '@/micro/components/ModalIamgeCard.vue'
import { SButton } from '@alegradev/smile-ui-next'
import { ref } from 'vue'

const isOpen = ref(true)

const handleOpenModal = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <SButton label="Open Modal" @click="handleOpenModal" />

  <ModalImageCard
    size="medium"
    title="Titulo Modal"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, adipisci velit ab aliquam veniam odit vitae non ipsam dolorem quaerat, totam quia ut vel error ducimus eveniet accusantium enim quam!"
    cancel-text="Cancelar"
    succeed-text="Aceptar"
    btn-size="small"
    image-url="https://www.looper.com/img/gallery/my-hero-academia-the-reason-all-might-is-the-most-powerful-teacher/intro-1596067346.jpg"
    @handle-open-modal="handleOpenModal"
    :is-open="isOpen"
  />
</template>

<style scoped></style>
