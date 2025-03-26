import apiClient from './AxiosClient'
export default {
  getAnnouncements() {
    return apiClient.get('/announcements')
  },
  getAnnouncement(id: number) {
    return apiClient.get(`/announcements/${id}`)
  },
  getAnnouncementByStudentId(id: number) {
    return apiClient.get(`/announcements/advisor-id-by-student-id/${id}`)
  },
}
