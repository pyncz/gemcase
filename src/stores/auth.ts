import type { SliceCaseReducers } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Nullable } from '@voire/type-utils'

interface State {
  value: Nullable<number>
}

export const authSlice = createSlice<State, SliceCaseReducers<State>>({
  name: 'auth',
  initialState: {
    value: null,
  },
  reducers: {
    connect: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const diff = action ? action.payload : 1
      state.value = state.value ? (state.value + diff) : diff
    },
    disconnect: (state) => {
      state.value = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { connect, incrementByAmount } = authSlice.actions

export const authReducer = authSlice.reducer
