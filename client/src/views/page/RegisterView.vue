<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import type { RegisterForm } from '@/types'; // Ensure this type is correctly defined in your types file
import {
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
  faUserPlus,
  faIdCard,
  faCamera,
  faBuilding,
  faGraduationCap,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

// Add only the icons used in this page
library.add(
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
  faUserPlus,
  faIdCard,
  faCamera,
  faBuilding,
  faGraduationCap,
  faChalkboardTeacher
);

// Inject SweetAlert2
const $swal = Swal;

// Reactive form state
const form = ref<RegisterForm>({
  username: '',
  password: '',
  student_id_card: '',
  first_name: '',
  last_name: '',
  picture: null,
  department_id: '',
  degree_id: '',
  advisor_id: '',
});

// Handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    form.value.picture = target.files[0]; // Capture the file
  }
};

// Submit form
const submitForm = async () => {
  const formData = new FormData();
  Object.entries(form.value).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value as string | Blob);
    }
  });
  try {
    const response = await axios.post(
      'http://localhost:3000/students',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log('Success:', response.data);

    // Show success alert
    $swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);

    // Show error alert
    $swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data || error.message,
    });
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="sm:w-1/3 md:w-4/12 lg:w-8/12 max-w-xl m-auto py-20">
      <div class="card card-border border-base-300 card-sm overflow-hidden">
        <div class="border-base-300 border-b border-dashed">
          <div class="flex items-center gap-2 p-4">
            <div class="grow">
              <div class="flex items-center gap-2 text-sm font-medium">
                <font-awesome-icon
                  :icon="['fas', 'user-plus']"
                  class="size-5 opacity-40"
                />
                ลงทะเบียนสมาชิกสำหรับนักศึกษา
              </div>
            </div>
          </div>
        </div>

        <div class="card-body gap-4">
          <p class="text-xs opacity-60">
            ลงทะเบียนเพื่อใช้ระบบการนัดหมายอาจารย์ที่ปรึกษา
          </p>

          <!-- Username -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.username"
                type="text"
                class="grow"
                placeholder="Username"
              />
            </label>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'key']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.password"
                type="password"
                class="grow"
                placeholder="Password"
              />
            </label>
          </div>

          <!-- Student ID -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'id-card']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.student_id_card"
                type="text"
                class="grow"
                placeholder="Student ID"
              />
            </label>
          </div>

          <!-- First & Last Name -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.first_name"
                type="text"
                class="grow"
                placeholder="First Name"
              />
            </label>
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.last_name"
                type="text"
                class="grow"
                placeholder="Last Name"
              />
            </label>
          </div>

          <!-- Picture Upload -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'camera']"
                class="h-4 w-4 opacity-70"
              />
              <input class="pt-2" type="file" @change="handleFileUpload" />
            </label>
          </div>

          <!-- Department, Degree, Advisor -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'building']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.department_id"
                type="text"
                class="grow"
                placeholder="Department ID"
              />
            </label>
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'graduation-cap']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.degree_id"
                type="text"
                class="grow"
                placeholder="Degree ID"
              />
            </label>
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'chalkboard-teacher']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.advisor_id"
                type="text"
                class="grow"
                placeholder="Advisor ID"
              />
            </label>
          </div>

          <!-- Submit Button -->
          <div class="card-actions items-center gap-6">
            <button type="submit" class="btn btn-primary btn-block">
              ลงทะเบียน
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang=""></style>
