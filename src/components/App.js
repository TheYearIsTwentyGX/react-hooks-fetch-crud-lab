import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(q => setQuestions(q));
  }, []);

  function handleAddQuestion(newQ) {
    setQuestions([...questions, newQ]);
  }
  function handleDeleteQuestion(deletedID) {
    const updatedQuestions = questions.filter((q) => q.id !== deletedID);
    setQuestions(updatedQuestions);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionSubmit={handleAddQuestion} /> : <QuestionList questions={questions} onDelete={handleDeleteQuestion} />}
    </main>
  );
}

export default App;
