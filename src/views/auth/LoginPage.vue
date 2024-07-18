<template>
  <div
    class="page-container flex items-center justify-center overflow-hidden min-w-full min-h-full"
  >
    <auth-background />
    <div
      class="shadow border-normal px-6 py-14 md:px-7 lg:px-8 lg:py-16 z-10 bg-white"
    >
      <div class="text-lg text-left mb-2 font-bold">Anmeldung</div>
      <div class="text-secondary font-medium text-description">
        Bitte geben Sie Ihre Daten ein
      </div>
      <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5">
        <input-field
          v-model:value="formData.email"
          :icon="'envelope'"
          :id="'email'"
          :placeholder="'E-Mail-Adresse'"
          :validation="v.email"
          :error-message="'Ungültige E-Mail-Adresse'"
        />
        <input-field
          v-model:value="formData.password"
          :icon="'lock'"
          :id="'password'"
          :input-type="'password'"
          :placeholder="'Passwort'"
          :validation="v.password"
          :error-message="' Passwort wird benötigt'"
          :is-toggle-mask="true"
          :autocomplete="'current-password'"
        />

        <a href="" class="link my-2">Passwort vergessen</a>

        <Button label="Anmelden" type="submit" />
      </form>
      <div class="mt-6">
        Ich habe kein Konto?
        <a href="/register" class="link-bold">Registrieren</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthBackground from '@/components/auth/AuthBackground.vue';
import { reactive } from 'vue';
import { required, email as emailValidator } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import authApi from '@/apis/auth.api.js';
import { useRouter } from 'vue-router';
import InputField from '@/components/common/InputField.vue';

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});

// Validation rules
const rules = {
  email: { required, email: emailValidator },
  password: { required },
};

// Setup validation
const v = useVuelidate(rules, formData);

// Submit handler
const handleSubmit = async () => {
  const validationResult = await v.value.$validate();
  if (!validationResult) {
    return;
  }
  await authApi.login(formData);

  // Route to home screen when login successfully.
  router.push({ path: '/dashboard' });
};
</script>

<style scoped lang="scss"></style>
