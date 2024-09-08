import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './Students-List';
import StudentDetails from './StudentsDetails';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
