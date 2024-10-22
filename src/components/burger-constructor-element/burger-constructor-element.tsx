import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelectors,
  burgerConstructorActions
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const ingredients = useSelector(burgerConstructorSelectors.getIngredients);
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];
        dispatch(burgerConstructorActions.onUpdateIngredients(newIngredients));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        const newIngredients = [...ingredients];
        [newIngredients[index - 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index - 1]
        ];
        dispatch(burgerConstructorActions.onUpdateIngredients(newIngredients));
      }
    };

    const handleClose = () => {
      const newIngredients = ingredients.filter((_, idx) => idx !== index);
      dispatch(burgerConstructorActions.onUpdateIngredients(newIngredients));
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
