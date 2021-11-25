import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import FindCard from "../../components/FindCard/FindCard";
import { Iitem } from "../../interface";
import { addItem } from "../../store/item-redux";
import s from "./Main.module.scss";
import cn from "classnames";
import { addFilterRegex } from "../../store/reducer";

function Main() {
  const items = useSelector((state: RootStateOrAny) => state.items);

  const [inputAdd, setInputAdd] = useState<string | undefined>("");
  const [inputFind, setInputFind] = useState<string | undefined>("");
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const handleSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputAdd){
      dispatch(addItem(inputAdd));
    }
    setInputAdd("");
  };

  const handleSubmitFind = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputFind) {
      dispatch(addFilterRegex(new RegExp(inputFind, 'i')))

      if (inputFind[0] === "#") {
        setInputFind("");
        filterItems(inputFind);
        setIsSubmit(true);
      } else {
        setIsError(true);
      }
    }
  };

  const filterItems = (inputFind: string | undefined) => {
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
  };

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperLeft}>
        <form className={s.form} onSubmit={(e) => handleSubmitAdd(e)}>
          <label htmlFor="">Add new note:</label>
          <div>
            <input
              type="text"
              value={inputAdd}
              onChange={(e) => {
                setInputAdd(e.currentTarget.value);
              }}
            />
            <button className={s.buttonAdd} type="submit">
              Add
            </button>
          </div>
        </form>
        <Cards />
      </div>
      <div className={s.wrapperRight}>
        <form className={s.form} onSubmit={(e) => handleSubmitFind(e)}>
          <label htmlFor="">Find note by tag: </label>
          <div>
            <input
              type="text"
              value={inputFind}
              onChange={(e) => {
                setInputFind(e.currentTarget.value); setIsError(false); setIsSubmit(false)

              }}
            />
            <button className={s.buttonFind} type="submit">
              Find
            </button>
          </div>
        </form>
        {!isError ? (
          <FindCard isSubmit={isSubmit} />
        ) : (
          <span className={cn(s.error, { [s.activeError]: isError })}>Must start with #</span>
        )}
      </div>
    </div>
  );
}
export default Main;
