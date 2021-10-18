import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./Card.module.scss";

interface Props {
  //   items: Iitem[];
}
function Card() {
  const items = useSelector((state: RootStateOrAny) => state.items);
  return (
    <div className={s.cardContainer}>
      {items.map((item: Iitem) => {
              return (
          <div className={s.card} key={item.id}>
            {item.text}
            <div className={s.tags}>
              {/* <input
                type="text"
                value={inputTag}
                onChange={(e) => {
                  setInputTag(e.currentTarget.value);
                }}
              /> */}
              {item.tags ? item.tags.map((item, i)=>{return <div key = {i}>{item}</div>}) : null }
              
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Card;
