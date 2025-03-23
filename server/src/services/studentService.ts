import type { InStudent } from '../models/student'
import * as repo from '../repository/studentRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export function getAllStudents() {
  return repo.getAllStudents()
}

export function getStudentById(id: number) {
  return repo.getStudentById(id)
}

export function addStudent(newStudent: InStudent) {
  const dataStudent = {
    username: newStudent.username,
    password: bcrypt.hashSync(newStudent.password),
    student_id_card: newStudent.student_id_card,
    first_name: newStudent.first_name,
    last_name: newStudent.last_name,
    picture: newStudent.picture,
    department_id: newStudent.department_id,
    degree_id: newStudent.degree_id,
    advisor_id: newStudent.advisor_id
  };
  return repo.addStudent(dataStudent)
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
