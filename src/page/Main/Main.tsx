import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import { addItem } from "../../store/item-redux";

function Main() {
  const [inputAdd, setInputAdd] = useState<string | undefined>("");
  const dispatch = useDispatch();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addItem(inputAdd))
    setInputAdd('')
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">Add new note:</label>
        <input
          type="text"
          value={inputAdd}
          onChange={(e) => {
            setInputAdd(e.currentTarget.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      <Card />
    </div>
  );
}
export default Main;
