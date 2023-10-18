<script setup lang="ts">
import { ref } from 'vue'
import {
  SBreadcrumb,
  SButton,
  SCheckbox,
  SChip,
  SDropwdown,
  SEmptyState,
  SModal,
  SNumberInput,
  SOverflowMenu,
  SPageHeading,
  SRadio,
  SStepper,
  STabs,
  STooltip,
  SWizard,
} from '@alegradev/smile-ui-next'

// Options for Checkbox
const optionsCheckbox = [
  { value: '1', label: 'Option 1', indeterminate: true },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]
const checkboxState = ref()
const dropdown = ref<string[]>([])
const optionsDropdown = [
  {
    text: 'Javascript',
    code: 'js',
    icon: 'flag-3',
  },
  {
    text: 'PHP',
    code: 'php',
    icon: 'flag-3',
  },
  {
    text: 'Python',
    code: 'py',
    icon: 'flag-3',
  },
  {
    text: 'C++',
    code: 'cc',
    icon: 'flag-3',
  },
]

const numberInput = ref(0)
const radioModel = ref()
const radioOptions = [
  {
    value: '1',
    label: 'Opción 1',
  },
  {
    value: '2',
    label: 'Opción 2',
  },
  {
    value: '3',
    label: 'Opción 3',
    disabled: true,
  },
]

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6']
const stepsRef = ref()
</script>

<template>
  <h1>Hello Smile UI</h1>

  <h3 class="mb-6">Smile Label</h3>
  <SBreadcrumb label="Testing Label" :active="true" />
  <hr class="mb-6" />

  <h3 class="mb-6">Smile Button</h3>
  <div class="flex items-center justify-center gap-3">
    <SButton size="medium" label="Button" class="transition-colors ease-linear duration-300" />
    <SButton size="medium" label="Button" type="destructive" />
    <SButton size="medium" label="Button" type="reversed" />
    <SButton size="medium" label="Button" emphasis="outline" />
    <SButton size="medium" label="Button" emphasis="subtle" />
    <SButton size="medium" label="Button" icon-left="categories" />
    <SButton size="medium" label="Button" :loading="true" />
    <SButton size="medium" label="Button" :disabled="true" />
    <SButton size="medium" only-icon="accounting" />
  </div>
  <hr class="mb-6" />

  // TODO: Ask for how
  <h3 class="mb-6">Checkbox</h3>
  <SCheckbox
    orientation="horizontal"
    :options="optionsCheckbox"
    v-model="checkboxState"
    name="check"
    :id="optionsCheckbox"
  />
  <hr class="mb-6" />

  <h3 class="mb-6">Chip</h3>
  <SChip class="mb-4" label="Chip Input" type="input" avatar="SF" />
  <SChip class="mb-4" label="Chip Input" type="input" avatar="SF" :selected="true" />
  <SChip class="mb-4" label="Chip Filter" type="filter" avatar="SF" icon="banks" />
  <hr class="mb-6" />

  <h3 class="mb-6">Dropdown</h3>
  <!-- <SDropwdown :options="optionsDropdown" v-model:model-value="dropdown" label="Hola" /> -->
  <hr class="mb-6" />

  <h3 class="mb-6">Empty State</h3>
  <SEmptyState />
  <hr class="mb-6" />

  <h3 class="mb-6">SForm</h3>

  <hr class="mb-6" />

  <h3 class="mb-6">Modal</h3>
  <SModal
    header-text="Testing Modal"
    :model-value="false"
    size="medium"
    cancel-text="Cancelar"
    success-text="Guardar"
    >Hello</SModal
  >
  <hr class="mb-6" />

  <h2>Number Input</h2>
  <SNumberInput v-model="numberInput" label="Number Input" :step="1" />

  <hr />

  <h2>Overflow Menu</h2>
  <!-- <SOverflowMenu>Hello</SOverflowMenu> -->

  <h2>Heading Title</h2>

  <SPageHeading title="Training Title" description="Training Description" :border="true" />

  <SRadio
    v-model="radioModel"
    :options="radioOptions"
    label="Radio Options"
    orientation="horizontal"
  />

  <SPageHeading title="Steper" description="Training Steper" :border="true" />
  <SStepper v-model="stepsRef" :steps="steps" class="mt-6" />

  <SPageHeading title="Tabs" description="Training Tabs" :border="true" />
  <STabs :filled="true"> </STabs>

  <STooltip content="Hello" />
  <!-- <SWizard /> -->
</template>

<style scoped></style>
