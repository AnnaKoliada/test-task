import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Iitem } from "../../interface";
import s from "./FindCard.module.scss";

interface Props {
  isSubmit: boolean;
}
function FindCard({isSubmit }: Props) {
  const filter = useSelector((state: RootStateOrAny) => state.card.regex)
  // @ts-ignore
  const items = useSelector(state => state.card.cards.filter((el: Iitem) => el.tags.some((el1:string) => el1.match(filter))))
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
