<script setup lang="ts">
import { inject } from 'vue'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
//เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser
)

const $swal = inject<typeof Swal>('$swal')
const showAlert = () => {
  $swal?.fire({
    icon: 'success',
    title: 'บันทึกข้อมูลสำเร็จ',
    showConfirmButton: false,
    timer: 1500,
  }) ?? console.error('$swal is not available')
}
</script>
<template lang="">
  <div class="sm:w-1/3 md:w-4/12 lg:w-8/12 max-w-xl m-auto py-20">
    <div class="card card-border border-base-300 card-sm overflow-hidden">
      <div class="border-base-300 border-b border-dashed">
        <div class="flex items-center gap-2 p-4">
          <div class="grow">
            <div class="flex items-center gap-2 text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 opacity-40"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                ></path>
              </svg>
              ลงทะเบียนสมาชิกสำหรับนักศึกษา
            </div>
          </div>
        </div>
      </div>
      <div class="card-body gap-4">
        <p class="text-xs opacity-60">
          ลงทะเบียนเพื่อใช้ระบบการนัดหมายอาจารย์ที่ปรึกษา
        </p>
        <div class="flex flex-col gap-1">
          <label
            class="input input-border flex max-w-none items-center gap-2 w-full"
            ><font-awesome-icon :icon="['fas', 'user']" class="h-4 w-4 opacity-70" />
            <input type="text" class="grow" placeholder="Username"
          /></label>
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="input input-border flex max-w-none items-center gap-2 w-full"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <input type="password" class="grow" placeholder="password"
          /></label>
        </div>
        <div class="card-actions items-center gap-6">
          <button @click="() => showAlert()" class="btn btn-primary btn-block">
            ลงทะเบียน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
