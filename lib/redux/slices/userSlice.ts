import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  wallet: string | undefined;
  walletConnected: boolean;
  bondContractApproved: boolean;
}

const initialState: UserState = {
  wallet: undefined,
  walletConnected: false,
  bondContractApproved: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<any>) => {
      state.wallet = action.payload;
      state.walletConnected = true;
      state.bondContractApproved = true;
    },
    removeWallet: (state) => {
      state.wallet = undefined;
      state.walletConnected = false;
      state.bondContractApproved = false;
    },
  },
});

export const { addWallet, removeWallet } = userSlice.actions;

export default userSlice.reducer;
