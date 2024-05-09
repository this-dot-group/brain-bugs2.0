import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "../../env";
import he from "he";

const CATEGORY_LIST = "CATEGORY_LIST";

export default (state = [], { type, payload }) =>
  type === CATEGORY_LIST ? payload : state;

export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const { categoriesReducer: categories } = getState();
      if (categories.length) return categories;
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}/categories`);
      const categoryListArray = res.data.map((category) => {
        return {
          label: he.decode(category.name),
          value: category.id,
        };
      });
      dispatch({
        type: CATEGORY_LIST,
        payload: categoryListArray,
      });
    } catch (e) {
      console.error(e.response.data);
    }
  };
};
