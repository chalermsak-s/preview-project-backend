<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import apiClient from '@/services/AxiosClient'

// Ensure this type is correctly defined in your types file
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
    faChalkboardUser,
    faRotateLeft
} from '@fortawesome/free-solid-svg-icons'

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
    faChalkboardTeacher,
    faChalkboardUser,
    faRotateLeft
)

// Inject SweetAlert2
const $swal = Swal
// Initialize router
const router = useRouter()

interface AddAppointment {
    topic: string
    description: string
    appointment_request_date: Date
    student_confirmation: number
    student_id: number
    advisor_id: number
    status_appointment_id: number
}

// Reactive form state
const form = ref<AddAppointment>({
    topic: '',
    description: '',
    appointment_request_date: new Date(),
    student_confirmation: 0,
    student_id: 0,
    advisor_id: 0,
    status_appointment_id: 0
})

// Submit form
const submitForm = async () => {
    const formData = new FormData()
    try {
        const response = await apiClient.post('/appointment', formData)
        console.log('Success:', response.data)

        // Show success alert
        $swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
        })

        form.value = {
            topic: '',
            description: '',
            appointment_request_date: new Date(),
            student_confirmation: 0,
            student_id: 0,
            advisor_id: 0,
            status_appointment_id: 0
        }
        router.push('/student-dashboard')
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message)

        // Show error alert
        $swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error.response?.data ? 'ไม่สามารถเพิ่มรายการนัดหมายได้' : error.response?.data || error.message,
        })
    }
}

const goBack = () => {
    router.go(-1) // กลับไปหน้าก่อนหน้า
}
</script>

<template>
    <div class="sm:w-1/3 md:w-6/12 lg:w-10/12 max-w-xxl m-auto mt-10">
        <div class="card p-4">
            <section class="container mx-auto p-4">
                <div class="grid md:grid-cols-1 gap-6">
                    <div class="card-actions justify-start">
                        <button class="btn w-xs" @click="goBack">
                            <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
                        </button>
                    </div>
                    <div class="card bg-base-200">
                        <div class="card-body">
                            <form @submit.prevent="submitForm">
                                <h4 class="text-xl font-bold">เพิ่มรายการนัดหมาย</h4>
                                <div class="form-control mt-2">
                                    <label class="label">
                                        <span class="label-text font-semibold">หัวข้อ</span>
                                    </label>
                                    <input v-model="form.topic" type="text" class="input input-bordered w-full"
                                        placeholder="Type your topic..." required autocomplete="off">

                                </div>
                                <!-- Topic Input -->
                                <!-- Message Input -->
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text font-semibold">คำอธิบาย</span>
                                    </label>
                                    <textarea v-model="form.description" class="textarea textarea-bordered w-full"
                                        rows="5" placeholder="Type your description..." autocomplete="off" required></textarea>
                                </div>
                                <div class="form-control mt-2">
                                    <label class="label">
                                        <span class="label-text font-semibold">วันและเวลาทีต้องการนัดหมาย</span>
                                    </label>
                                    <input v-model="form.appointment_request_date" type="datetime-local" step="2" class="input input-bordered w-full"
                                        placeholder="Type your topic..." required autocomplete="off">

                                </div>
                                <!-- Submit Button -->
                                <div class="form-control mt-4">
                                    <button type="submit" class="btn btn-primary w-full">
                                        เพิ่มการนัดหมาย
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
