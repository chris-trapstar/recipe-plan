import IngredientCard from "../components/IngredientCard";

const SET_INGREDIENT = "ingredients/SET_INGREDIENT";
const SET_CURRENT = "ingredients/SET_CURRENT";
const ADD_CURRENT = "ingredients/ADD_CURRENT";
const REMOVE_CURRENT = "ingredients/REMOVE_CURRENT";
const REMOVE_CURRENT_ID = "ingredients/REMOVE_CURRENT_ID";

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient,
});

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT,
  payload: ingredient,
});

export const setCurrentIngredients = (amount, measurement, ingredient) => async (dispatch) => {
  // Does this need recipe Id??
  const res = await fetch("/api/recipes/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      measurement,
      ingredient
    }),
  });
  const data = await res.json();
  dispatch(setCurrentIngredient(data));
};

export const addCurrentIngredient = (ingredient) => ({
  type: ADD_CURRENT,
  payload: ingredient,
});

export const removeCurrentIngredient = (ingredient) => ({
  type: REMOVE_CURRENT,
  payload: ingredient,
});

export const removeCurrentIngredientID = (ingredient) => ({
  type: REMOVE_CURRENT_ID,
  payload: ingredient,
});

export const removeIngredient = (ingredient) => async (dispatch) => {
  const ingredient_id = ingredient.props.recipe_id
  const recipe_id = ingredient.props.recipe_id
  console.log(ingredient_id, recipe_id)
  console.log('IDS to be deleted', ingredient_id, recipe_id)
  const res = await fetch("/api/ingredients/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredient_id,
      recipe_id
    }),
  });
  const data = await res.json();
  dispatch(removeCurrentIngredientID(data));
  return
}

export const getAllIngredients = () => async (dispatch) => {
  const res = await fetch("/api/ingredients/");
  const data = await res.json();
  dispatch(setIngredient(data));
};

const initialState = { ingredients: [], current: [] };

export default function ingredientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT:
      state.ingredients = action.payload.ingredients;
      return state;
    case SET_CURRENT:
      console.log('it made it', action.payload)
      console.log(IngredientCard)
      return (state.current = action.payload);
    case ADD_CURRENT:
      state.current = [...state.current, action.payload];
      return state;
    case REMOVE_CURRENT:
      const newState = state.current.filter((current) => {
        console.log('Check this for props.identifier', current, action.payload)
        return !(current.props.identifier === action.payload.props.identifier);
      });
      state.current = newState;
      return state;
    case REMOVE_CURRENT_ID:
      const newStateID = state.current.filter((current) => {
        console.log('Check this for props.identifier', current, action.payload)
        console.log(current, (current.props.recipe_id === action.payload.recipe_id && current.props.ingredient_id === Number(action.payload.ingredient_id)))
        return !(current.props.recipe_id === action.payload.recipe_id && current.props.ingredient_id === Number(action.payload.ingredient_id));
      });
      console.log(newStateID, 'newStateID')
      state.current = newStateID;
      return state;
    default:
      return state;
  }
}
