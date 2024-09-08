import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Student {
  id: number;
  forename: string;
  surname: string;
  form: string;
  send: boolean;
}
const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  useEffect(() => {
    fetch('/students.json')
      .then((response) => response.json())
      .then((data: Student[]) => {
        const foundStudent = data.find((student) => student.id === parseInt(id || '', 10));
        setStudent(foundStudent || null);
      });
  }, [id]);
  if (!student) {
    return <div>Student not found</div>;
  }
  return (
    <div>
      <h1>{student.forename} {student.surname}</h1>
      <p>Form: {student.form}</p>
      <p>SEND: {student.send ? 'Yes' : 'No'}</p>
    </div>
  );
};
export default StudentDetails;
