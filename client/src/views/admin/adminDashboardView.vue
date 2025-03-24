<script setup lang="ts">
import StudentService from '@/services/StudentService'
import AdvisorService from '@/services/AdvisorService'
import AppointmentService from '@/services/AppointmentService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Student, Advisor, Appointment } from '@/types'

const students = ref<Student[]>([])
const advisors = ref<Advisor[]>([])
const appointments = ref<Appointment[]>([])

const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Student Start */
const fetchStudents = async () => {
  try {
    const response = await StudentService.getStudentList()
    students.value = response.data
  } catch (err) {
    error.value =
      'Error fetching students: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

// Custom pagination Student
const currentStduentPage = ref(1)
const pageStudentSize = 3

const totalStudentPages = computed(() =>
  Math.ceil(students.value.length / pageStudentSize)
)

const currentStduentPageItems = computed(() => {
  const start = (currentStduentPage.value - 1) * pageStudentSize
  return students.value.slice(start, start + pageStudentSize)
})

const prveStudent = () => {
  if (currentStduentPage.value > 1) currentStduentPage.value--
}

const nextStudent = () => {
  if (currentStduentPage.value < totalStudentPages.value)
    currentStduentPage.value++
}

/* Student End */

/* Advisor Start */
const fetchAdvisors = async () => {
  try {
    const response = await AdvisorService.getAdvisors()
    advisors.value = response.data
  } catch (err) {
    error.value =
      'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

// Custom pagination Advisor
const currentAdvisorPage = ref(1)
const pageAdvisorSize = 3

const totalAdvisorPages = computed(() =>
  Math.ceil(advisors.value.length / pageAdvisorSize)
)

const currentAdvisorPageItems = computed(() => {
  const start = (currentAdvisorPage.value - 1) * pageAdvisorSize
  return advisors.value.slice(start, start + pageAdvisorSize)
})

const prveAdvisor = () => {
  if (currentAdvisorPage.value > 1) currentAdvisorPage.value--
}

const nextAdvisor = () => {
  if (currentAdvisorPage.value < totalAdvisorPages.value)
    currentAdvisorPage.value++
}

/* Advisor End */

/* Appointment Start */
const fetchAppointments = async () => {
  try {
    const response = await AppointmentService.getAppointments()
    appointments.value = response.data
  } catch (err) {
    error.value =
      'Error fetching appointments: ' +
      (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

const currentAppointmentPage = ref(1)
const pageAppointmentSize = 3

const totalAppointmentPages = computed(() =>
  Math.ceil(appointments.value.length / pageAppointmentSize)
)

const currentAppointmentPageItems = computed(() => {
  const start = (currentAppointmentPage.value - 1) * pageAppointmentSize
  return appointments.value.slice(start, start + pageAppointmentSize)
})

const prveAppointment = () => {
  if (currentAppointmentPage.value > 1) currentAppointmentPage.value--
}

const nextAppointment = () => {
  if (currentAppointmentPage.value < totalAppointmentPages.value)
    currentAppointmentPage.value++
}

/* Appointment End */

onMounted(fetchStudents)
onMounted(fetchAdvisors)
onMounted(fetchAppointments)
</script>
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <!-- Student Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <div class="card-body">
          <h2 class="text-xl font-semibold mb-4">ข้อมูลนักศึกษา</h2>
          <div class="overflow-x-auto rounded-box border border-base-content/5">
            <table class="table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รหัสนักศึกษา</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>สาขาวิชา</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loading State -->
                <tr v-if="loading" class="text-center p-4">
                  <td colspan="5">กำลังโหลด...</td>
                </tr>

                <!-- Error State -->
                <tr v-if="error" class="text-center p-4 text-red-500">
                  <td colspan="5">{{ error }}</td>
                </tr>

                <!-- Empty State -->
                <tr v-if="!loading && !students.length" class="text-center p-4">
                  <td colspan="5">ไม่มีข้อมูลนักศึกษา</td>
                </tr>
                <tr
                  v-for="(student, index) in currentStduentPageItems"
                  :key="student.id"
                >
                  <td>
                    {{ (currentStduentPage - 1) * pageStudentSize + index + 1 }}
                  </td>
                  <td>{{ student.student_id_card }}</td>
                  <td>{{ student.first_name }} {{ student.first_name }}</td>
                  <td>{{ student.department?.department_name }}</td>
                  <td>
                    <RouterLink
                      :to="
                        student.id
                          ? {
                              name: 'admin-student-detail-view',
                              params: { id: student.id },
                            }
                          : '#'
                      "
                      class="btn"
                      >ละเอียด</RouterLink
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="join p-3">
              <button
                class="join-item btn"
                @click="prveStudent()"
                :disabled="currentStduentPage === 1"
              >
                «
              </button>
              <button class="join-item btn">
                Page {{ currentStduentPage }} of {{ totalStudentPages }}
              </button>
              <button
                class="join-item btn"
                @click="nextStudent()"
                :disabled="currentStduentPage === totalStudentPages"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Faculty Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <div class="card-body">
          <h2 class="text-xl font-semibold mb-4">ข้อมูลอาจารย์ที่ปรึกษา</h2>
          <RouterLink
            :to="{ name: 'admin-add-advisor' }"
            class="btn btn-neutral w-xs"
          >
            เพิ่มข้อมูลอาจารย์ที่ปรึกษา
          </RouterLink>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 mt-3"
          >
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>ภาควิชา</th>
                  <th>ตำแหน่ง</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(advisor, index) in currentAdvisorPageItems"
                  :key="advisor.id"
                >
                  <td>
                    {{ (currentAdvisorPage - 1) * pageAdvisorSize + index + 1 }}
                  </td>
                  <td>{{ advisor.first_name }} {{ advisor.last_name }}</td>
                  <td>{{ advisor.department?.department_name }}</td>
                  <td>
                    {{ advisor.academic_position?.academic_position_name }}
                  </td>
                  <td>
                    <RouterLink
                      :to="
                        advisor.id
                          ? {
                              name: 'admin-advisor-detail-view',
                              params: { id: advisor.id },
                            }
                          : '#'
                      "
                      class="btn"
                      >ละเอียด</RouterLink
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="join p-3">
              <button
                class="join-item btn"
                @click="prveAdvisor()"
                :disabled="currentAdvisorPage === 1"
              >
                «
              </button>
              <button class="join-item btn">
                Page {{ currentAdvisorPage }} of {{ totalAdvisorPages }}
              </button>
              <button
                class="join-item btn"
                @click="nextAdvisor()"
                :disabled="currentAdvisorPage === totalAdvisorPages"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointment Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <div class="card-body">
          <h2 class="text-xl font-semibold mb-4">ข้อมูลการนัดหมาย</h2>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 mt-3"
          >
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>อาจารย์ที่ปรึกษา</th>
                  <th>วันที่นัดหมาย</th>
                  <th>นักศึกษา</th>
                  <th>สถานะ</th>
                  <th>ตัวจัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(appointment, index) in currentAppointmentPageItems"
                  :key="appointment.id"
                >
                  <td>{{ (currentAppointmentPage - 1) * pageAppointmentSize + index + 1 }}</td>
                  <td>
                    {{ appointment.advisor?.first_name }}
                    {{ appointment.advisor?.last_name }}
                  </td>
                  <td>
                    {{
                      UtilService.formatDateTime(
                        appointment.appointment_request_date
                      )
                    }}
                  </td>
                  <td>
                    {{ appointment.student?.first_name }}
                    {{ appointment.student?.last_name }}
                  </td>
                  <td
                    v-html="
                      UtilService.statusToHtml(appointment.status?.status)
                    "
                  ></td>
                  <td>
                    <RouterLink
                      :to="
                        appointment.id
                          ? {
                              name: 'admin-appointment-detail-view',
                              params: { id: appointment.id },
                            }
                          : '#'
                      "
                      class="btn"
                      >ละเอียด</RouterLink
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="join p-3">
              <button
                class="join-item btn"
                @click="prveAppointment()"
                :disabled="currentAppointmentPage === 1"
              >
                «
              </button>
              <button class="join-item btn">
                Page {{ currentAppointmentPage }} of {{ totalAppointmentPages }}
              </button>
              <button
                class="join-item btn"
                @click="nextAppointment()"
                :disabled="currentAppointmentPage === totalAppointmentPages"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- News Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ข้อมูลประกาศ</h2>
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-24</td>
              <td>New Semester Announcement</td>
              <td>Details about the new semester schedule.</td>
            </tr>
            <tr>
              <td>2025-03-23</td>
              <td>University Event</td>
              <td>Upcoming event details and invitation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Log Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางคอมเมนต์</h2>
        <div class=""></div>
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-24</td>
              <td>New Semester Announcement</td>
              <td>Details about the new semester schedule.</td>
            </tr>
            <tr>
              <td>2025-03-23</td>
              <td>University Event</td>
              <td>Upcoming event details and invitation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Log Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางประวัติการใช้งาน</h2>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-03-24</td>
                <td>New Semester Announcement</td>
                <td>Details about the new semester schedule.</td>
              </tr>
              <tr>
                <td>2025-03-23</td>
                <td>University Event</td>
                <td>Upcoming event details and invitation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
