import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {addIngredient, getBurgerConstructor} from '../../slices/addIngredientsSlice'
import { useDispatch, useSelector } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    
    const dispatch = useDispatch();

    const handleAdd = () => dispatch(addIngredient(ingredient));

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
