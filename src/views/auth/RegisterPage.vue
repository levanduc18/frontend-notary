<template>
  <div
    class="page-container flex items-center justify-center overflow-hidden min-w-full min-h-full"
  >
    <auth-background />
    <div class="border-normal px-6 py-14 z-10 bg-white shadow max-w-md">
      <div class="text-lg text-left mb-2 font-bold">Registrieren</div>
      <div class="text-secondary font-medium text-description">
        Lass uns anfangen
      </div>
      <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5">
        <div class="flex flex-col sm:flex-row gap-5">
          <input-field
            class="flex-1"
            v-model:value="formData.firstName"
            :icon="'user'"
            :id="'firstName'"
            :placeholder="'Vorname'"
            :validation="v.firstName"
            :error-message="'Vorname wird benötigt'"
          />

          <input-field
            class="flex-1"
            v-model:value="formData.lastName"
            :id="'lastName'"
            :placeholder="'Nachname'"
            :validation="v.lastName"
            :error-message="'Nachname wird benötigt'"
          />
        </div>

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

        <input-field
          v-model:value="formData.confirmPassword"
          :icon="'lock'"
          :id="'confirmPassword'"
          :input-type="'password'"
          :placeholder="'Bestätige das Passwort'"
          :validation="v.confirmPassword"
          :error-message="'Bestätigen Sie, dass das Passwort nicht übereinstimmt'"
          :is-toggle-mask="true"
          :autocomplete="'current-password'"
          :is-reactive-validation="true"
        />

        <div class="flex flex-wrap gap-8 my-2 w-full justify-between">
          <div class="flex">
            <Checkbox
              v-model="isReadTermsAndConditions"
              inputId="readTermsAndConditions"
              name="readTermsAndConditions"
              :binary="true"
            />
            <label for="readTermsAndConditions" class="ml-2">
              Ich habe die
              <a href="" class="link-bold">Datenschutzerklärung. </a>
            </label>
          </div>
        </div>

        <Button
          :disabled="!isReadTermsAndConditions"
          label="Registrieren"
          type="submit"
        />
      </form>
      <div class="mt-6">
        Sie haben bereits ein Konto?
        <a href="/login" class="link-bold">Anmelden</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthBackground from '@/components/auth/AuthBackground.vue';
import { reactive, ref, readonly, computed } from 'vue';
import {
  required,
  email as emailValidator,
  sameAs,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import authApi from '@/apis/auth.api';
import { useRouter } from 'vue-router';
import InputField from '@/components/common/InputField.vue';

const router = useRouter();

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const isReadTermsAndConditions = ref(false);

// Validation rules
const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email: emailValidator },
  password: { required },
  confirmPassword: {
    required,
    sameAsPassword: sameAs(computed(() => formData.password)),
  },
};

// Setup validation
const v = useVuelidate(rules, formData);

// Submit handler
const handleSubmit = async () => {
  const validationResult = await v.value.$validate();
  if (!validationResult) {
    return;
  }
  const dataToSend = readonly({
    ...formData,
    confirmPassword: undefined,
  });

  await authApi.register(dataToSend);

  // Route to login screen when register successfully.
  router.push({ path: '/login' });
};
</script>

<style scoped lang="scss"></style>
