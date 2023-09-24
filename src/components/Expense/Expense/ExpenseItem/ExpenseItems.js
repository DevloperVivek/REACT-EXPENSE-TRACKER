import classes from "./ExpenseItems.module.css";
import { useSelector } from "react-redux";

const ExpenseItems = (props) => {
  const theme = useSelector((state) => state.dark.isDark);

  const deleteHandler = async () => {
    props.delete();
  };

  const updateHandler = async () => {
    props.update();
  };

  return (
    <div className={`${classes.list} ${theme ? classes.darkList : ""}`}>
      <h2>
        {props.no}. {props.description}
      </h2>
      <h3>
        {`${props.date.getDate()}-${props.date.getMonth()}-${props.date.getFullYear()}`}
      </h3>
      <h2>{props.category}</h2>
      <p>${props.expense}</p>
      <div className={classes.btn}>
        <button onClick={updateHandler} className={classes.updateBtn}>
          Update
        </button>
        <button onClick={deleteHandler} className={classes.dtlBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItems;
