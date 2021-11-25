import data from "../data.json";

const initialState = {
  regex: null,
  cards: data,
}


export const deleteItemCard = (id: string) => ({
  type: "DELETE_ITEM",
  payload: id,
});

export const addFilterRegex = (reg: RegExp) => {
  return ({
    type: "ADD_FILTER",
    payload: reg,
  });
};

const reducer = (
  state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case "DELETE_ITEM":
      return {
        ...state,
        cards: state.cards.filter(el => el.id !== action.payload)
      }
    case "ADD_FILTER":
      return {
        ...state,
        regex: action.payload
      }
    default:
      return state;
  }
};
export default reducer;