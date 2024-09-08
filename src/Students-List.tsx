import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Students-List.module.css';

interface Student {
  id: number;
  forename: string;
  surname: string;
  form: string;
  send: boolean;
  image: string;
}
const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    fetch('/students.json')
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);
  const filteredStudents = students.filter((student) =>
    student.forename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.form.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={styles.container}>
      <h1>All pupils</h1>
      <input
        type="text"
        placeholder="Search for a pupil by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.listcontainer}>
      <div className={styles.headerRow}>
        <span className={styles.header}>Pupil names</span>
        <span className={styles.header}>Form</span>
        <span className={styles.header}>SEND</span>
      </div>

      <ul className={styles.studentList}>
        {filteredStudents.map((student) => (
          <li key={student.id} className={styles.studentItem}>
            <Link to={`/student/${student.id}`} className={styles.studentLink}>
              <div className={styles.details}>
                <div className={styles.pupilInfo}>
                  <img src={student.image} alt={`${student.forename} ${student.surname}`} className={styles.studentImage} />
                  <span className={styles.name}>{student.forename} {student.surname}</span>
                </div>
                <div className={styles.formSection}>
                  <span>{student.form}</span>
                </div>
                <div className={styles.sendSection}>
                  {student.send ? <span className={styles.checkmark}>✓</span> : 'No'}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
      {filteredStudents.length === 0 && <p>No students found</p>}
    </div>
  );
};
export default StudentList;
