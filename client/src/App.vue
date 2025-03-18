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
  faFile,
  faUsersBetweenLines,
  faUserTie,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

// เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(
  faCirclePlay,
  faComments,
  faHouse,
  faRightToBracket,
  faUserPlus,
  faFile,
  faUsersBetweenLines,
  faUserTie,
  faCode
);

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
              <a @click="isOpen = false"
                ><font-awesome-icon :icon="['fas', 'file']" /> รายชื่อ</a
              >
              <ul class="p-2">
                <li>
                  <a @click="isOpen = false"
                    ><font-awesome-icon :icon="['fas', 'user-tie']" />
                    อาจารย์</a
                  >
                </li>
                <li>
                  <a @click="isOpen = false"
                    ><font-awesome-icon
                      :icon="['fas', 'users-between-lines']"
                    />นักศึกษา</a
                  >
                </li>
              </ul>
            </li>
            <li>
              <RouterLink :to="{ name: 'about-view' }" @click="closeMenu">
                <font-awesome-icon :icon="['fas', 'code']" /> เกี่ยวกับ
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
              <summary>
                <font-awesome-icon :icon="['fas', 'file']" /> รายชื่อ
              </summary>
              <ul class="p-2 w-max">
                <li>
                  <RouterLink :to="{ name: 'login-view' }"
                    ><font-awesome-icon :icon="['fas', 'user-tie']" />
                    อาจารย์</RouterLink
                  >
                </li>
                <li>
                  <RouterLink :to="{ name: 'about-view' }"
                    ><font-awesome-icon
                      :icon="['fas', 'users-between-lines']"
                    />
                    นักศึกษา</RouterLink
                  >
                </li>
              </ul>
            </details>
          </li>
          <li>
            <RouterLink :to="{ name: 'about-view' }"
              ><font-awesome-icon :icon="['fas', 'code']" />
              เกี่ยวกับ</RouterLink
            >
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

  <main class="flex-grow">
    <RouterView />
  </main>
  <footer
    class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4"
  >
    <aside class="grid-flow-col items-center">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>
      <p>
        ApptCAMT Copyright © {{ new Date().getFullYear() }} - All right reserved
      </p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="https://github.com/chalermsak-s/BackEndProject" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          width="36"
          height="36"
          class="fill-current"
        >
          <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      </a>
    </nav>
  </footer>
</template>
<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ให้เต็มหน้าจอ */
}

main {
  flex-grow: 1; /* ขยายให้เต็ม */
}
</style>
