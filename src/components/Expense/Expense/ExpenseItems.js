import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  const deleteHandler = async () => {
    props.delete();
  };

  const updateHandler = async () => {
    props.update();
  };

  return (
    <div className={classes.list}>
      <div>
        <h2>
          {props.no}. {props.desc}
        </h2>
        <h3>
          {`${props.date.getDate()}-${props.date.getMonth()}-${props.date.getFullYear()}`}
        </h3>
      </div>
      <div>
        <h3>{props.cat}</h3>
        <p>${props.expense}</p>
      </div>
      <span className={classes.btn}>
        <button onClick={updateHandler} className={classes.updateBtn}>
          Update
        </button>
        <button onClick={deleteHandler} className={classes.dtlBtn}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default ExpenseItems;
