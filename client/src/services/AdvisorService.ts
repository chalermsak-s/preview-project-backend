import apiClient from './AxiosClient'

export default {
  getAdvisors() {
    return apiClient.get('/advisors');
  }
};
