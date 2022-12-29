import { createSlice } from '@reduxjs/toolkit';
import { Produit } from '../utils/Produit';

interface ProduitsState {
  produits: Produit[];
  produit: Produit;
}

const initialState: ProduitsState = {
  produits: [],
  produit: {
    _id: '',
    title: '',
    imgSrc: '',
    price: 0,
    productLink: '',
    manufacturer: '',
  },
};

export const produitsSlice = createSlice({
  name: 'produits',
  initialState,
  reducers: {
    setProduits: (state, action) => {
      state.produits = action.payload;
    },
    setProduit: (state, action) => {
      state.produit = action.payload;
    },
  },
});

export const { setProduits, setProduit } = produitsSlice.actions;
export default produitsSlice.reducer;
