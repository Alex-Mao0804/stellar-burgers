import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientById } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  let ingredientData = null;
  if (id) {
    ingredientData = useSelector(state => getIngredientById(state.ingredients, id));
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
