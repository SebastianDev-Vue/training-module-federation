<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SPageHeading, SButton, SInput, SDropdown } from '@alegradev/smile-ui-next'
import profileApi from '../api/profileApi'
import { $transF } from 'app_alegra_commons/translate'

const fullName = ref('')
const userName = ref('')
const phone = ref('')
const prefix = ref('')
const whatsppNumber = ref('')
const whatsappPrefix = ref('')

const country = ref('Colombia')
const language = ref('')
const isLoading = ref(false)
const email = ref('')

const inputFileRef = ref<HTMLInputElement | null>(null)
const selectedImage = ref<File | null>(null)

const optionsLenguage = [
  {
    text: 'Espanol (Latinoamerica)',
    code: 'es',
  },
  {
    text: 'English',
    code: 'en',
  },
]

const optionsPrefix = [
  {
    text: '+57',
    code: '57',
  },
  {
    text: '+32',
    code: '32',
  },
  {
    text: '+41',
    code: '41',
  },
]

const handleSubmit = async () => {
  const data = {
    email: email.value,
    language: language.value,
    lastName: fullName.value.split(' ')[1],
    name: fullName.value.split(' ')[0],
    phone: `${prefix.value}${phone.value}`,
    prefix: `${prefix.value}`,
    username: userName.value,
    whatsapp: `${whatsappPrefix.value} ${whatsppNumber.value}`,
  }

  try {
    await profileApi.put('/self', data)
    console.log('Datos guardados correctamente')
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

const handleInputRef = () => {
  if (inputFileRef.value) inputFileRef.value.click()
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedImage.value = target.files[0]
    // Now, 'selectedImage.value' contains the selected file (image).
    // You can access its properties, such as 'name' or 'type'.

    try {
      await profileApi.post('/attachment/profilepic', selectedImage.value)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(async () => {
  isLoading.value = true

  try {
    const { data } = await profileApi.get('/self')
    console.log(data)

    fullName.value = `${data.name} ${data.lastName}`
    userName.value = data.username
    prefix.value = data.phone.slice(0, 3)
    language.value = data.lenguage
    phone.value = data.phone.slice(3)
    whatsppNumber.value = data.phone.slice(3)
    whatsappPrefix.value = data.phone.slice(0, 3)
    email.value = data.email

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
})
</script>

<template>
  <SPageHeading :title="$transF('header')" :description="$transF('description')" :border="false" />

  <article class="bg-white rounded-xl p-6 shadow-lg">
    <h2 class="font-semibold text-slate-900 text-lg pb-2 border-b w-full">
      {{ $transF('title') }}
    </h2>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-[240px_1fr_1fr] mt-6 gap-6">
      <div class="flex flex-col items-center justify-center gap-4 w-40">
        <img src="../assets/pngegg.png" alt="Profile Pic" class="w-40 h-40" />

        <input type="file" ref="inputFileRef" class="hidden" @change="handleImageUpload" />
        <SButton
          @click="handleInputRef"
          :label="$transF('editProfilePicture')"
          emphasis="outline"
        />
      </div>

      <p v-if="isLoading">{{ $transF('loading') }}</p>

      <template v-else>
        <div>
          <SInput class="mb-4" v-model:model-value="fullName" :label="$transF('fullName')" />

          <div>
            <h5 class="font-medium text-sm text-slate-700 mb-1">
              {{ $transF('phone') }} <span class="text-sm-primary-500">*</span>
            </h5>

            <div
              class="flex items-center active:outline-sm-primary-500 focus:outline-sm-primary-500 w-full h-10 mb-4"
            >
              <select
                v-model="prefix"
                class="w-36 h-10 border border-r-0 rounded-lg rounded-r-none border-slate-300 active:outline-sm-primary-500 focus:outline-sm-primary-500 text-center"
              >
                <option
                  v-for="prefixPhone in optionsPrefix"
                  :key="prefixPhone.code"
                  :value="prefixPhone.text"
                  :selected="prefixPhone.text === prefix"
                >
                  {{ prefixPhone.text }}
                </option>
              </select>

              <input
                v-model="phone"
                type="text"
                class="rounded-l-none w-full h-10 my-1 space-x-2 px-2.5 py-1.5 rounded-[10px] border border-slate-300 active:outline-sm-primary-500 focus:outline-sm-primary-500"
              />
            </div>
          </div>
          <SInput
            class="mb-4"
            v-model:model-value="country"
            :label="$transF('country')"
            :disabled="true"
          />
        </div>

        <div>
          <SInput
            class="mb-4"
            v-model:model-value="userName"
            :label="$transF('username')"
            icon-right="info"
          />
          <div>
            <h5 class="font-medium text-sm text-slate-700 mb-1">
              WhatsApp <span class="text-sm-primary-500">*</span>
            </h5>

            <div
              class="flex items-center active:outline-sm-primary-500 focus:outline-sm-primary-500 w-full h-10 mb-4"
            >
              <select
                v-model="whatsappPrefix"
                class="w-36 h-10 border border-r-0 rounded-lg rounded-r-none border-slate-300 active:outline-sm-primary-500 focus:outline-sm-primary-500 text-center"
                disabled
              >
                <option
                  v-for="prefixWp in optionsPrefix"
                  :key="prefixWp.code"
                  :value="prefixWp.text"
                  :selected="prefix === prefixWp.text"
                >
                  {{ prefixWp.text }}
                </option>
              </select>

              <input
                v-model="whatsppNumber"
                type="text"
                class="rounded-l-none w-full h-10 my-1 space-x-2 px-2.5 py-1.5 rounded-[10px] border border-slate-300 active:outline-sm-primary-500 focus:outline-sm-primary-500"
                disabled
              />
            </div>
          </div>
        </div>
      </template>

      <div class="flex items-center justify-end gap-4 col-span-full">
        <SButton :label="$transF('cancel')" emphasis="outline" />
        <SButton :label="$transF('submit')" native-type="submit" />
      </div>
    </form>
  </article>

  <article class="bg-white rounded-xl shadow-lg mt-6">
    <h2 class="font-semibold text-slate-900 text-lg px-6 py-3 border-b">
      {{ $transF('language') }}
    </h2>

    <div class="px-6">
      <p class="py-4">
        {{ $transF('titleLanguage') }}
      </p>

      <SDropdown
        :placeholder="language"
        v-model:model-value="language"
        :options="optionsLenguage"
        class="w-2/5 pb-4"
      />
    </div>
  </article>
</template>

<style scoped></style>
