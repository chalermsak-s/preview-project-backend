import type { InStudent } from '../models/student'
import * as studentRepository from '../repository/studentRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export function getAllStudents() {
  return studentRepository.getAllStudents()
}

export function getStudentById(id: number) {
  return studentRepository.getStudentById(id)
}

export function getStudentIdByUserId(id: number) {
  return studentRepository.getStudentIdByUserId(id)
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
  return studentRepository.addStudent(dataStudent)
}

export function updateStudentById(id:number,updatedStudent: InStudent) {
  const dataStudent = {
    username: updatedStudent.username,
    password: bcrypt.hashSync(updatedStudent.password),
    student_id_card: updatedStudent.student_id_card,
    first_name: updatedStudent.first_name,
    last_name: updatedStudent.last_name,
    picture: updatedStudent.picture,
    department_id: updatedStudent.department_id,
    degree_id: updatedStudent.degree_id,
    advisor_id: updatedStudent.advisor_id
  };
  return studentRepository.updateStudentById(id,dataStudent)
}

export async function getAllStudentPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const pageStudents = await studentRepository.getAllStudentPagination(
    keyword,
    pageSize,
    pageNo
  )
  return pageStudents
}


export function count() {
  return studentRepository.countStudent()
}
