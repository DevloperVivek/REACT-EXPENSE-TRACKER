import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import classes from "./Expense.module.css";
import ExpenseItems from "./ExpenseItems";

const Expense = () => {
  const [isForm, setForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const url =
    "https://react-expense-tracker-74a6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json";

  const formHandler = () => {
    setForm(!isForm);
  };

  const addHandler = async (obj) => {
    const url =
      "https://react-expense-tracker-74a6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json";
    const parsedObj = JSON.parse(JSON.stringify(obj));
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(parsedObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Could not add the expense data");
    }
    const data = await response.json();
    setExpenses((prevExpenses) => [...prevExpenses, { id: data.name, ...obj }]);
  };

  const deleteHandler = async (id) => {
    const url = `https://react-expense-tracker-74a6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Could not delete the expense data");
    }

    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const updateHandler = async (id) => {
    setForm(true);
    let newUrl = url.split(".json")[0];
    newUrl = newUrl + `/${id}.json`;
    const res = await fetch(newUrl);
    const newObj = await res.json();
    console.log(newObj);
    console.log(newObj);
    document.getElementById("Expense").value = newObj.expense;
    document.getElementById("Description").value = newObj.description;
    document.getElementById("Category").value = newObj.category;
    deleteHandler(id);
  };

  useEffect(() => {
    const url =
      "https://react-expense-tracker-74a6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json";
    const fetchData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Could not fetch the expenses data");
      }

      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          expense: data[key].expense,
          description: data[key].description,
          category: data[key].category,
          date: new Date(data[key].date),
        });
      }
      setExpenses(loadedExpenses);
    };

    fetchData().catch((error) => {
      console.log(error.message);
    });
  }, []);

  return (
    <div>
      <button className={classes.expenseBtn} onClick={formHandler}>
        Add Expense
      </button>
      {isForm && <ExpenseForm add={addHandler} cancle={formHandler} />}
      {expenses.map((expense, index) => (
        <ExpenseItems
          key={expense.id}
          no={index + 1}
          expense={expense.expense}
          desc={expense.description}
          cat={expense.category}
          date={expense.date}
          update={updateHandler.bind(this, expense.id)}
          delete={deleteHandler.bind(this, expense.id)}
        />
      ))}
    </div>
  );
};

export default Expense;
