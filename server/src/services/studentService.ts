import type { InStudent } from '../models/student'
import * as repo from '../repository/studentRepository'

export function getAllStudents() {
  return repo.getAllStudents()
}

export function getStudentById(id: number) {
  return repo.getStudentById(id)
}

export function addStudent(newStudent: InStudent) {
  return repo.addStudent(newStudent)
}

export async function getAllStudentPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const pageStudents = await repo.getAllStudentPagination(
    keyword,
    pageSize,
    pageNo
  )
  return pageStudents
}

export function count() {
  return repo.countStudent()
}
