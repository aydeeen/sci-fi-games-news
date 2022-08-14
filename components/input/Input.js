import classes from './Input.module.scss'

const Input = (props) => {
   return (
      <div className={classes["input-wrapper"]}>
         <input
            onChange={props.filterArticles}
            placeholder="...search article title or excerpt..."
            type="text"
         />
         <button>Search</button>
      </div>
   );
};

export default Input;
