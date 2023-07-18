import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkAction } from "../../../../Context/dark-redux";
import classes from "./Expense.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseItems from "../ExpenseItem/ExpenseItems";

const Expense = () => {
  const [isForm, setForm] = useState(false);
  const [items, setItem] = useState([]);
  const [isPrime, setPrime] = useState(false);
  const theme = useSelector((state) => state.dark.isDark);
  const Auth = useSelector((state) => state.auth);
  const email = Auth.email.split("@");
  const dispatch = useDispatch();
  const url = `https://react-expense-tracker-ee36e-default-rtdb.asia-southeast1.firebasedatabase.app/${email[0]}.json`;

  const formHandler = () => {
    setForm(!isForm);
  };

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
    const arr = items.filter((element) => {
      return element.id !== id;
    });
    setItem(arr);
    let newUrl = url.split(".json")[0];
    newUrl = newUrl + `/${id}.json`;
    const res = await fetch(newUrl, {
      method: "DELETE",
    });
    console.log(res);
  };

  const primehandler = () => {
    if (totalAmount > 10000) {
      setPrime(true);
    } else {
      alert("You are not premium user !!!");
    }
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
      console.log(rawData);
      const getData = await rawData.json();
      console.log(getData);
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

      const totalAmount = pushArray.reduce(
        (accumulator, element) => accumulator + parseInt(element.expense),
        0
      );
      setItem(pushArray);
      setPrime(totalAmount >= 10000);
    };
    get();
  }, [url]);

  let totalAmount = 0;

  const list = items.map((element, i) => {
    totalAmount += parseInt(element.expense);
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
      {list}
      <div className={classes.totalAmountCard}>
        <span className={classes.totalAmount}>
          Total Amount - ${totalAmount}
        </span>
        {!isPrime && <button onClick={primehandler}>Activate Premium</button>}
        {isPrime && (
          <div className={classes.expenseList}>
            <div className={!theme ? classes.topper : classes.darktopper}>
              <a
                href="https://vktstudios.vercel.com"
                id="download"
                download={"Expense.csv"}
              >
                <button onClick={downloadHandler}>Download</button>
              </a>
              <div className={classes.primeum}>
                {!theme && (
                  <button onClick={themeHandler} className={classes.themeBtn}>
                    Dark Theme
                  </button>
                )}
                {theme && (
                  <button onClick={themeHandler} className={classes.themeBtn}>
                    Light Theme
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Expense;
