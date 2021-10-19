import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./OneCard.module.scss";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { deleteItem } from "../../store/item-redux";

interface Props {
    item: Iitem;
    setPopapActive:(arg0: boolean) => void ;
    setDataItem: (arg0: any ) => void;
}
function OneCard({item, setPopapActive, setDataItem }: Props) {

  const items = useSelector((state: RootStateOrAny) => state.items);

  const dispatch = useDispatch();

  const deleteCard = (id: string) => {
    dispatch(deleteItem(id));
  };

  const editCard = (id: string) => {
   
    let el = items.find((item: Iitem)=>item.id===id)
    setDataItem(el)
    setPopapActive(false)
  };
  return (
  
          <div className={s.card} key={item.id}>
            {item.text}
            <div className={s.delete} onClick={() => deleteCard(item.id)}>
              <AiOutlineClose className={s.deleteIcon} />
            </div>
            <div className={s.edit} onClick={(e) => editCard(item.id)}>
              <AiOutlineEdit className={s.deleteIcon} />
            </div>
            <div className={s.tags}>
              {/* <input
                type="text"
                value={inputTag}
                onChange={(e) => {
                  setInputTag(e.currentTarget.value);
                }}
              /> */}
              {item.tags
                ? item.tags.map((item, i) => {
                    return <div key={i}>{item}</div>;
                  })
                : null}
            </div>
          </div>
   
  );
}
export default OneCard;
