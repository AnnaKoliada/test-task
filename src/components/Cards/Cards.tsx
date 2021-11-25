import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./Cards.module.scss";
import Poppap from "../Poppap/Poppap";
import OneCard from "../OneCard/OneCard";

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
