import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import FindCard from "../../components/FindCard/FindCard";
import { Iitem } from "../../interface";
import { addItem } from "../../store/item-redux";

function Main() {
  const items = useSelector((state: RootStateOrAny) => state.items);
  const [inputAdd, setInputAdd] = useState<string | undefined>("");
  const [inputFind, setInputFind] = useState<string | undefined>("");
  const [filterCards, setFilterCards] = useState<Iitem[]>([]);

  const dispatch = useDispatch();

  const handleSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addItem(inputAdd));
    setInputAdd("");
  };
  const handleSubmitFind = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputFind("");
    console.log("inputFind", inputFind);
    filterItems(inputFind);
  };
  const filterItems = (inputFind: string | undefined) => {
    // items.map()
    console.log(inputFind);
    let arr: any = [];
    items.forEach((item: Iitem) => {
      if (inputFind) {
        if (item.tags.includes(inputFind)) {
          item.tags.forEach((el) => {
            if (el === inputFind) {
              arr.push(item);
            }
          });
        }
      }
    });
    setFilterCards(arr);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmitAdd(e)}>
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
      <form onSubmit={(e) => handleSubmitFind(e)}>
        <label htmlFor="">Find note by tag: </label>
        <input
          type="text"
          value={inputFind}
          onChange={(e) => {
            setInputFind(e.currentTarget.value);
          }}
        />
        <button type="submit">Find</button>
      </form>
      <Cards />
      <FindCard items={filterCards} />
    </div>
  );
}
export default Main;
