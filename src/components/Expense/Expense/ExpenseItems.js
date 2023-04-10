import classes from "./Expense.module.css";

const ExpenseItems = (props) => {
  return (
    <div>
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
    </div>
  );
};

export default ExpenseItems;
