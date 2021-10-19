import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./FindCard.module.scss";
import Poppap from "../Poppap/Poppap";
import OneCard from "../OneCard/OneCard";

interface Props {
  items: Iitem[];
}
function FindCard({ items }: Props) {
  return (
    <div>
      {items.map((item: Iitem) =>
        <div className={s.card} key={item.id}>
          <div>{item.text}</div>
          <div>{item.tags}</div>
        </div>
      )}
    </div>
  );
}
export default FindCard;
