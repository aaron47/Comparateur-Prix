import { createSlice } from '@reduxjs/toolkit';
import { AuthResponse } from '../utils/AuthResponse';

interface UsersState {
  user: Partial<AuthResponse>;
}

const initialState: UsersState = {
  user: { email: '', magasinSelectionne: '', carteFidelite: '', _id: '' },
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = {
        email: '',
        magasinSelectionne: '',
        carteFidelite: '',
        _id: '',
      };
    },
  },
});

export const { setUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
