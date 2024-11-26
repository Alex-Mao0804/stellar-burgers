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
        dispatch(
          burgerConstructorActions.reorderConstructor({
            from: index,
            to: index + 1
          })
        );
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(
          burgerConstructorActions.reorderConstructor({
            from: index,
            to: index - 1
          })
        );
      }
    };

    const handleClose = () => {
      dispatch(burgerConstructorActions.removeFromConstructor(index));
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
