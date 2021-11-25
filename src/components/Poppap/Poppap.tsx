import React, { useState } from "react";
import { Iitem } from "../../interface";
import s from "./Poppap.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { editItem} from "../../store/item-redux";
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
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    console.log("Poppap", item);
    if (!isError) {
      if (item) {
        dispatch(editItem(item.id, item.tags, item.text));
      }
      setActive(true);
      setIsAddTag(false);
    }
  };


  const deleteTag = (el: string) => {
    console.log(item);
    let index = item?.tags.indexOf(el);
    let a: string[] | undefined;
    if (index !== undefined) {
      a = item?.tags.splice(index, 1);
      console.log(a);
    }
    console.log(index);

    if (item) {
      if (a) {
        setItem({
          id: item?.id,
          text: item?.text,
          tags: item?.tags,
        });
      }
    }

    console.log(item);
    index = undefined;
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
      setIsError(false);
      setAddNewTag("");
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={cn(s.poppap, { [s.active]: !active })} onClick={() => setActive(true)}>
      <div className={s.body}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <div className={s.title}>Edit Note</div>
          {item ? (
            <div>
              <form className={s.form} onSubmit={(e) => handleSubmit(e, item.id)}>
                <textarea
                  value={item.text}
                  onChange={(e) => {
                    setItem({ id: item.id, text: e.currentTarget.value, tags: item.tags });
                  }}
                ></textarea>
                <div className={s.tags}>
                  {item.tags.map((el, i) => {
                    return (
                      <div key={i} className={s.tag}>
                        <div className={s.tagText}>{el}</div>
                        <div className={s.delete} onClick={() => deleteTag(el)}>
                          <AiOutlineClose className={s.deleteIcon} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={cn(s.add, { [s.active]: isAddTag })}
                  onClick={() => setIsAddTag(true)}
                >
                  Add new tag
                  <GrAdd className={s.addIcon} />
                </div>
                <div className={cn(s.addTag, { [s.activeTag]: isAddTag })}>
                  <div className={s.addNewTag}>
                    <input
                      type="text"
                      value={addNewTag}
                      onChange={(e) => {
                        setAddNewTag(e.currentTarget.value);
                      }}
                    />
                    <div className={s.button} onClick={toAddNewTag}>
                      Add
                    </div>
                  </div>
                  <span className={cn(s.error, { [s.activeError]: isError })}>
                    Must start with #
                  </span>
                </div>
                <button className={cn(s.button, { [s.disable]: isError })} type="submit">
                  Edit
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Poppap;
