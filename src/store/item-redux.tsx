import { createUnparsedSourceFile } from "typescript";
import data from "../data.json";

const SHOW_ITEMS = "SHOW_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_TAGS = "UPDATE_TAGS";

export const init = data;

export const showItems = (value: any) => ({
  type: SHOW_ITEMS,
  value,
});

export const addItem = (value: any) => ({
  type: ADD_ITEM,
  value,
});

export const updateTags = (value: any, id: string) => ({
  type: UPDATE_TAGS,
  value,
  id,
});

const uniqueArray = (arr: string[]): string[] | [] => {
  let result: string[]  = [];
  for (let str of arr) {
    if (str !== "#") {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  }
  console.log(result);
  return result;
};

const searchTags = (inputTag: string | null, text: string | null): string[] | [] => {
  console.log(inputTag);
  let arrayTags: string[] = [];

  let idx1 = 0;
  let idx2 = 0;
  const searchTagsText = (str: string, index: number) => {
    let i = str.indexOf("#", index);
    if (i === str.length - 1) {
      return arrayTags;
    }
    let iLast = str.indexOf(" ", i);
    if (iLast !== -1) {
      let tag = str.slice(i, iLast);
      arrayTags.push(tag);
    }

    if (iLast === -1) {
      iLast = str.length - 1;
      let tag = str.slice(i);
      arrayTags.push(tag);
    }
    if (str.includes("#", iLast)) {
      searchTagsText(str, iLast);
    }
  };
 

  if (inputTag) {
    if (inputTag.includes("#", idx1)) {
      searchTagsText(inputTag, idx1);
    }
  }
  if (text) {
    if (text.includes("#", idx2)) {
      searchTagsText(text, idx2);
    }
  }
 return uniqueArray(arrayTags);
};

const showItemsReducer = (
  state = init,
  action: {
    type: string;
    value: string;
  }
) => {
  let stateCopy;
  console.log(state);
  switch (action.type) {
    case SHOW_ITEMS:
      stateCopy = [
        {
          ...state,
        },
      ];
      return stateCopy;
    case ADD_ITEM:
      stateCopy = [
        ...state,
        {
          id: `${state.length + 1}`,
          text: action.value,
          tags: searchTags(action.value, null),
        },
      ];
      return stateCopy;
    default:
      return state;
  }
};
export default showItemsReducer;
