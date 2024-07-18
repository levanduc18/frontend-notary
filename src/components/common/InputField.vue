<template>
  <div>
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="iconClass" />
      </InputGroupAddon>
      <component
        :is="inputComponent"
        :id="id"
        v-model="value"
        @input="handleChange"
        :placeholder="placeholder"
        v-bind="inputAttrs"
      />
    </InputGroup>
    <div
      v-if="!validation.$pending && validation.$error"
      class="text-red-400 mt-2"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';

const value = defineModel('value');
const props = defineProps({
  icon: String,
  id: { type: String, required: true },

  inputType: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password'].includes(value),
  },
  placeholder: { type: String },
  validation: { type: Object },
  errorMessage: { type: String },
  autocomplete: {
    type: String,
    default: 'off',
  },
  isToggleMask: {
    type: Boolean,
    default: false,
  },
  isReactiveValidation: {
    type: Boolean,
    default: false,
  },
});

const iconClass = computed(() => 'pi pi-' + props.icon);

const inputComponent = computed(() =>
  props.inputType === 'password' ? Password : InputText
);

const inputAttrs = computed(() => ({
  autocomplete: props.autocomplete,
  ...(props.inputType === 'password' && { toggleMask: props.isToggleMask }),
}));

const handleChange = () => {
  if (props.isReactiveValidation) props.validation.$validate();
};
</script>

<style scoped></style>
