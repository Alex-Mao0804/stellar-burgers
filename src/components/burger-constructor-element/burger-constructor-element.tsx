import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients, onUpdateIngredients } from '../../slices/addIngredientsSlice';


export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const ingredients = useSelector(getIngredients);
    const dispatch = useDispatch();

    
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [newIngredients[index + 1], newIngredients[index]];
        dispatch(onUpdateIngredients(newIngredients));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        const newIngredients = [...ingredients];
        [newIngredients[index - 1], newIngredients[index]] = [newIngredients[index], newIngredients[index - 1]];
        dispatch(onUpdateIngredients(newIngredients));
      }
    };

    const handleClose = () => {
      const newIngredients = ingredients.filter((_, idx) => idx !== index);
      dispatch(onUpdateIngredients(newIngredients));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
