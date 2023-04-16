import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkAction } from "../../../Context/dark-redux";
import classes from "./Expense.module.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";

const Expense = () => {
  const [isForm, setForm] = useState(false);
  const [items, setItem] = useState([]);
  const [isPrime, setPrime] = useState(false);
  const theme = useSelector((state) => state.dark.isDark);
  const dispatch = useDispatch();

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

  const themeHandler = () => {
    dispatch(DarkAction.toggle());
    console.log("Theme");
  };

  const downloadHandler = () => {
    const arr = [["Description", "Category", "Expense"]];
    items.forEach((element) => {
      arr.push([element.description, element.category, element.expense]);
    });
    let csvContent =
      "data:text/csv;charset=utf-8," + arr.map((e) => e.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    const download = document.getElementById("download");
    download.setAttribute("href", encodedUri);
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
      <div className={!theme ? classes.getForm : classes.darkgetForm}>
        <button onClick={formHandler}>Add Expense</button>
        {isForm && (
          <span>
            <ExpenseForm add={addHandler} cancle={formHandler} />
          </span>
        )}
      </div>
      <div className={classes.expenseList}>
        <div className={!theme ? classes.topper : classes.darktopper}>
          {isPrime && (
            <span>
              <a href="www.youtube.com" id="download" download={"Expense.csv"}>
                <button onClick={downloadHandler}>Download</button>
              </a>
              {!theme && <button onClick={themeHandler}>Dark Theme</button>}
              {theme && <button onClick={themeHandler}>Light Theme</button>}
            </span>
          )}
        </div>
      </div>
      {list}
      <div className={classes.footer}>
        <span>Total Amount - ${totalAmount}</span>
        {prime && <button onClick={primehandler}>Activate Premium </button>}
      </div>
    </div>
  );
};

export default Expense;
