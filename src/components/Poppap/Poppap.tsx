import React, { useState } from "react";
import { Iitem } from "../../interface";
import s from "./Poppap.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { editItem, searchTags } from "../../store/item-redux";
import { AiOutlineClose } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

interface Props {
  active: boolean;
  item: Iitem | undefined;
  setActive: (arg0: boolean) => void;
  setItem: (arg0: Iitem) => void;
}
function Poppap({ active, item, setActive, setItem }: Props) {
  const dispatch = useDispatch();
  const [isAddTag, setIsAddTag] = useState(false);
  const [addNewTag, setAddNewTag] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    console.log("Poppap", item);
    if (item) {
      dispatch(editItem(item.id, item.tags, item.text));
    }
    setActive(true);
  };

  const deleteTag = (el: string) => {
    console.log(item?.tags);
    let index = item?.tags.indexOf(el);
    if (index) {
      if (item) {
        setItem({
          id: item?.id,
          text: item?.text,
          tags: item?.tags.splice(index, 1),
        });
      }
    }
    console.log(item);
  };

  const addTag = () => {
    setIsAddTag(true);
  };

  const toAddNewTag = () => {
    if (addNewTag[0] === "#") {
      if (item) {
        setItem({
          id: item?.id,
          text: item?.text,
          tags: [...item?.tags, addNewTag],
        });
      }
    }
    setAddNewTag("");
  };

  return (
    <div className={cn(s.poppap, { [s.active]: !active })} onClick={() => setActive(true)}>
      <div className={s.body}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          {item ? (
            <div>
              <form onSubmit={(e) => handleSubmit(e, item.id)}>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    setItem({ id: item.id, text: e.currentTarget.value, tags: item.tags })
                  }
                />
                {item.tags.map((el, i) => {
                  return (
                    <div key={i}>
                      <div>{el}</div>
                      <div className={s.delete} onClick={() => deleteTag(el)}>
                        <AiOutlineClose className={s.deleteIcon} />
                      </div>
                    </div>
                  );
                })}
                <div className={s.add} onClick={addTag}>
                  <GrAdd className={s.deleteIcon} />
                </div>
                <div className={cn(s.addTag, { [s.activeTag]: isAddTag })}>
                  <input
                    type="text"
                    value={addNewTag}
                    onChange={(e) => {
                      setAddNewTag(e.currentTarget.value);
                    }}
                  />
                  <div onClick={toAddNewTag}>Add</div>
                </div>

                <button type="submit">Edit</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Poppap;
