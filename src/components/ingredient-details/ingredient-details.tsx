import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientById } from '../../slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  let ingredientData = null;
  if (id) {
    ingredientData = useSelector(state => getIngredientById(state.burgerIngredients, id));
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
