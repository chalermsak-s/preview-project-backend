<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCirclePlay,
  faComments,
  faHouse,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

// เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(faCirclePlay, faComments, faHouse, faRightToBracket, faUserPlus);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// ปิด Dropdown เมื่อคลิกล้านอก
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// ติดตั้ง Event Listener เมื่อ Component โหลด
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// ลบ Event Listener เมื่อ Component ถูกทำลาย
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// ปิด Dropdown เมื่อคลิกเมนู
const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div ref="dropdownRef" class="dropdown">
          <!-- ปุ่มเปิดเมนู -->
          <button
            @click.stop="isOpen = !isOpen"
            class="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <!-- เมนู Dropdown -->
          <ul
            v-if="isOpen"
            tabindex="0"
            class="menu menu-lg dropdown-content bg-base-100 rounded-box z-50 mt-3 w-80 p-2 shadow absolute"
          >
            <li>
              <RouterLink :to="{ name: 'login-view' }" @click="closeMenu">
                <font-awesome-icon :icon="['fas', 'house']" /> หน้าหลัก
              </RouterLink>
            </li>
            <li>
              <a @click="isOpen = false">รายชื่อ</a>
              <ul class="p-2">
                <li><a @click="isOpen = false">อาจารย์</a></li>
                <li><a @click="isOpen = false">นักศึกษา</a></li>
              </ul>
            </li>
            <li>
              <RouterLink :to="{ name: 'about-view' }" @click="closeMenu">
                เกี่ยวกับ
              </RouterLink>
            </li>
          </ul>
        </div>

        <RouterLink :to="{ name: 'login-view' }" class="btn btn-ghost text-xl">
          <font-awesome-icon :icon="['fas', 'comments']" />
          ApptCAMT
        </RouterLink>
      </div>

      <div class="navbar-center hidden lg:flex z-50">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink :to="{ name: 'login-view' }">
              <font-awesome-icon :icon="['fas', 'house']" />
              หน้าหลัก
            </RouterLink>
          </li>
          <li>
            <details>
              <summary>รายชื่อ</summary>
              <ul class="p-2 w-max">
                <li>
                  <RouterLink :to="{ name: 'login-view' }">อาจารย์</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'about-view' }">นักศึกษา</RouterLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <RouterLink :to="{ name: 'about-view' }">เกี่ยวกับ</RouterLink>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <a class="btn btn-primary mr-0.5">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span class="hidden sm:block">ลงทะเบียน</span>
        </a>
        <RouterLink :to="{ name: 'login-view' }" class="btn btn-neutral ml-0.5">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          <span class="hidden sm:block">เข้าสู่ระบบ</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
