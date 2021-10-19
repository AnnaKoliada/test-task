import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./Cards.module.scss";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { deleteItem } from "../../store/item-redux";
import Poppap from "../Poppap/Poppap";
import OneCard from "../OneCard/OneCard";

interface Props {}
function Cards() {
  const items = useSelector((state: RootStateOrAny) => state.items);
  const [popapActive, setPopapActive] = useState<boolean>(true);
  const [dataItem, setDataItem] = useState<Iitem | undefined>();
  return (
    <div className={s.cardContainer}>
      {items.map((item: Iitem) => {
        return (
          <OneCard
            item={item}
            setPopapActive={setPopapActive}
            setDataItem={setDataItem}
            key={item.id}
          />
        );
      })}
      <Poppap
        active={popapActive}
        setActive={setPopapActive}
        item={dataItem}
        setItem={setDataItem}
      />
    </div>
  );
}
export default Cards;
