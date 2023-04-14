import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Expense.module.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";

const Expense = () => {
  const [isForm, setForm] = useState(false);
  const [items, setItem] = useState([]);
  const [isPrime, setPrime] = useState(false);
  const Auth = useSelector((state) => state.auth);

  const formHandler = () => {
    setForm(!isForm);
  };

  let prime = false;
  const url = `https://react-expense-tracker-74a6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json`;

  const addHandler = async (obj) => {
    console.log(obj);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      obj = { id: data.name, ...obj };
    } else {
      alert("Can't send your request to server");
    }
    setItem([obj, ...items]);
    setForm(!isForm);
  };

  const updateHandler = async (id) => {
    setForm(true);
    let newUrl = url.split(".json")[0];
    newUrl = newUrl + `/${id}.json`;
    const res = await fetch(newUrl);
    const newObj = await res.json();
    console.log(newObj);
    document.getElementById("Expense").value = newObj.expense;
    document.getElementById("Description").value = newObj.description;
    document.getElementById("Category").value = newObj.category;
    deleteHandler(id);
  };

  const deleteHandler = async (id) => {
    const ar = items.filter((element) => {
      return element.id !== id;
    });
    setItem(ar);
    let newUrl = url.split(".json")[0];
    newUrl = newUrl + `/${id}.json`;

    const res = await fetch(newUrl, {
      method: "DELETE",
    });

    console.log(res);
  };

  const primehandler = () => {
    setPrime(true);
  };

  useEffect(() => {
    const get = async () => {
      const rawData = await fetch(url);
      const getData = await rawData.json();
      let pushArray = [];
      for (const key in getData) {
        const obj = {
          expense: getData[key].expense,
          description: getData[key].description,
          category: getData[key].category,
          date: new Date(getData[key].date),
          id: key,
        };
        pushArray.push(obj);
      }
      setItem(pushArray);
    };

    get();
  }, [url]);

  let totalAmount = 0;

  const list = items.map((element, i) => {
    totalAmount += parseInt(element.expense);
    if (totalAmount >= 10000) {
      prime = true;
    }
    return (
      <ExpenseItems
        key={i}
        expense={element.expense}
        desc={element.description}
        cat={element.category}
        no={i + 1}
        date={element.date}
        update={updateHandler.bind(this, element.id)}
        delete={deleteHandler.bind(this, element.id)}
      />
    );
  });

  return (
    <div>
      <div className={classes.getForm}>
        <button className={classes.expenseBtn} onClick={formHandler}>
          Add Expense
        </button>
        {isForm && (
          <span>
            <ExpenseForm add={addHandler} cancle={formHandler} />
          </span>
        )}
      </div>
      {list}
      <div className={classes.totalAmount}>
        <span>Total Amount - ${totalAmount}</span>
        {prime && <button onClick={primehandler}>Activate Premium </button>}
      </div>
    </div>
  );
};

export default Expense;
