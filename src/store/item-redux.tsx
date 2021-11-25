import data from "../data.json";

const SHOW_ITEMS = "SHOW_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";

export const init = data;

export const showItems = (value: any) => ({
  type: SHOW_ITEMS,
  value,
});

export const addItem = (value: any) => ({
  type: ADD_ITEM,
  value,
});

// export const updateTags = (value: any, id: string) => ({
//   type: UPDATE_TAGS,
//   value,
//   id,
// });

export const deleteItem = (id: string) => ({
  type: DELETE_ITEM,
  id,
});

export const editItem = (id: string, valueTags?: string[], valueText?: string) => ({
  type: EDIT_ITEM,
  id,
  valueTags,
  valueText,
});

export const uniqueArray = (arr: string[]): string[] | [] => {
  let result: string[] = [];
  for (let str of arr) {
    if (str !== "#") {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  }
  console.log("result", result);
  return result;
};

export const searchTags = (inputTag: string | null, text: string | null): string[] | [] => {
  let arrayTags: string[] = [];

  let idx1 = 0;
  let idx2 = 0;
  console.log(inputTag);

  const searchTagsText = (str: string, index: number) => {
    let i = str.indexOf("#", index);
    console.log(str);
    console.log(str);

    if (i === str.length - 1) {
      return arrayTags;
    }

    let iLast = str.indexOf(" ", i);
    // let iLast2 = str.indexOf(",", i);
    // let iLast3 = str.indexOf(".", i);
    // let iLast4 = str.indexOf("-", i);
    // let iLast5 = str.indexOf("/", i);
    // let iLast6 = str.indexOf("?", i);
    // let iLast = Math.min(iLast1, iLast2, iLast3, iLast4, iLast5, iLast6);
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

        inputTag = inputTag.replace(/,.!&-'"_%*/g, " ");
      searchTagsText(inputTag, idx1);
    }
  }
  if (text) {
    if (text.includes("#", idx2)) {
      console.log(text)
      text = text.replace(/[,.?!&-\-'"_%*]/g, " ");
      console.log(text)

      searchTagsText(text, idx2);
    }
  }
  console.log("arrayTags", arrayTags);
  return uniqueArray(arrayTags);
};

const showItemsReducer = (
  state = init,
  action: {
    type: string;
    value: string;
    id: string;
    valueTags: string[];
    valueText: string;
  }
) => {
  let stateCopy;
  switch (action.type) {
    case SHOW_ITEMS:
      stateCopy = [
        {
          ...state,
        },
      ];
      return stateCopy;

    case ADD_ITEM:
      console.log(state)
      stateCopy = [
        ...state,
        {
          id: (+state[state.length-1].id + 1).toString(),
          text: action.value,
          tags: searchTags(action.value, null),
        },
      ];
      return stateCopy;

    case DELETE_ITEM:
      stateCopy = [...state];
      const index = stateCopy.findIndex((n) => n.id === action.id);
      stateCopy.splice(index, 1);
      return stateCopy;

    case EDIT_ITEM:
      stateCopy = [...state];
      const el = stateCopy.find((n) => n.id === action.id);
      if (el) {
        el.text = action.valueText;
        el.tags = searchTags(action.valueTags.join(' '), action.valueText);
      }

      return stateCopy;

    default:
      return state;
  }
};
export default showItemsReducer;
