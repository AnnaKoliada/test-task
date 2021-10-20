import React from "react";
import { Iitem } from "../../interface";
import s from "./FindCard.module.scss";

interface Props {
  items: Iitem[];
  isSubmit: boolean;
}
function FindCard({ items, isSubmit }: Props) {
 return (
  (items.length !== 0 ) ? 
  (<div className={s.findWrapper}>
  {items.map((item: Iitem) =>
    <div className={s.card} key={item.id}>
      <div className={s.text}>{item.text}</div>
      <div className={s.tags}>{item.tags}</div>
    </div>
  )}
</div> )
:  
(items.length === 0 && isSubmit) ? <div className={s.empty}>No results</div> : <div></div>
 
 )  

}
export default FindCard;
