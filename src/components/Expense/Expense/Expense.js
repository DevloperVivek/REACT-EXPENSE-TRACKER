import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const Expense = () => {
  const [isForm, setForm] = useState(false);

  const formHandler = () => {
    setForm(!isForm);
  };

  const addHandler = async (obj) => {
    console.log(obj);
    // const res = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(obj),
    // });
  };

  return (
    <div>
      <button onClick={formHandler}>Add Expense</button>
      {isForm && (
        <span>
          <ExpenseForm add={addHandler} cancle={formHandler} />
        </span>
      )}
    </div>
  );
};

export default Expense;
