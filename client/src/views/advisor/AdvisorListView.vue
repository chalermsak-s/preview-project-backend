<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '@/services/AxiosClient';
import type { Advisor } from '@/types'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faChevronLeft, faChevronRight);


const advisors = ref<Advisor[]>([])

const fetchAdvisors = async () => {
  try {
    const response = await apiClient.get('/advisors');
    advisors.value = response.data;
  } catch (error) {
    console.error('Error fetching advisors:', error);
  }
};

onMounted(fetchAdvisors);
</script>

<template>
  <div class="max-w-xl mx-auto mt-10">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">รายชื่ออาจารย์</li>
      <li v-for="advisor in advisors" :key="advisor.id" class="list-row">
      <div>
        <font-awesome-icon
          class="rounded-box fa-2x opacity-80"
          :icon="['far', 'circle-user']"
        />
      </div>
      <div>
        <div>{{ advisor.first_name }} {{ advisor.last_name }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ advisor.academic_position?.academic_position_name }}
        </div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ advisor.department?.department_name }}
        </div>
      </div>
    </li>
    </ul>
  </div>
</template>