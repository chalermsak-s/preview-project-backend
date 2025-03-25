import * as advisorRepository from '../repository/advisorRepository'

export function getAllAdvisors() {
  return advisorRepository.getAllAdvisors()
}

export function getAdvisorById(id: number) {
  return advisorRepository.getAdvisorById(id)
}

export function getStudentByAdvisorById(id: number) {
  return advisorRepository.getStudentByAdvisorById(id)
}

export function getAdvisorIdByUserId(id: number) {
  return advisorRepository.getAdvisorIdByUserId(id)
}
