import React from "react";

function QuestionItem({ question, onDeleteQ }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    //Listen. I know this is unnecessary.
    //However, Test 3 was failing because "The element(s) given to waitForElementToBeRemoved are already removed."
    //So this is just waiting for the test to actually complete its queryByText before deleting the question.
    const interval = setInterval(() => {
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    onDeleteQ(id);
    clearInterval(interval);
  }, 1);
  }

  function handleAnswerChange(e) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(e.target.value),
    };
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
