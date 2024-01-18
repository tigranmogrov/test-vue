<script setup lang="ts">
import { IErrors, validate } from '@/composable/post/validate';
import { API_URL } from '@/constants';
import { API } from '@/fetchApi';
import { IPost } from '@/types';
import { reactive, ref } from 'vue';

const props = defineProps<{
  post: IPost;
}>();
const emits = defineEmits(['updatePost']);

const validationErrors = ref<IErrors | null>(null);

const updateFormData = reactive<Omit<IPost, 'avatar' | 'id'>>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
});

const dataFilling = () => {
  if (props.post) {
    for (const key in props.post) {
      updateFormData[key] = props.post[key];
    }
  }
};

dataFilling();
const updatePost = () => {
  validationErrors.value = validate({
    name: updateFormData.first_name,
    email: updateFormData.email,
  });
  if (!Object.keys(validationErrors.value).length) {
    API.patch(`${API_URL}/users/${props.post.id}`, updateFormData).then(
      (res) => {
        emits('updatePost', res.data);
      }
    );
  }
};
</script>

<template>
  <form @submit.prevent="updatePost" class="form" novalidate>
    <div class="form-col">
      <div class="form-field">
        <label class="form-label" for="first-name">First Name</label>
        <input
          name="last-name"
          id="first-name"
          class="form-input"
          :class="validationErrors?.name?.invalid ? 'field-error' : null"
          type="text"
          v-model="updateFormData.first_name"
          placeholder="First Name" />
        <span v-if="validationErrors?.name?.invalid" class="form-error-message">
          {{ validationErrors?.name?.message }}
        </span>
      </div>
      <div class="form-field">
        <label class="form-label" for="last-name">Last Name</label>
        <input
          name="last-name"
          id="last-name"
          class="form-input"
          type="text"
          v-model="updateFormData.last_name"
          placeholder="Last Name" />
      </div>
    </div>
    <div class="form-col">
      <div class="form-field">
        <label class="form-label" for="email">Email</label>
        <input
          name="email"
          id="email"
          class="form-input"
          type="email"
          :class="validationErrors?.email?.invalid ? 'field-error' : null"
          v-model="updateFormData.email"
          placeholder="Email" />
        <span
          v-if="validationErrors?.email?.invalid"
          class="form-error-message">
          {{ validationErrors?.email?.message }}
        </span>
      </div>
      <div class="form-field">
        <label class="form-label" for="phone">Phone</label>
        <input
          name="phone"
          id="phone"
          class="form-input"
          type="text"
          v-model="updateFormData.phone"
          placeholder="Phone" />
      </div>
    </div>
    <div class="form-col">
      <div class="form-field">
        <label class="form-label" for="address">Address</label>
        <input
          name="address"
          id="address"
          class="form-input"
          type="text"
          v-model="updateFormData.address"
          placeholder="Address" />
      </div>
    </div>
    <button type="submit" class="btn btn--submit">Create</button>
  </form>
</template>
