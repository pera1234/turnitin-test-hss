import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Membership } from '../Type';

interface MembersState {
    list: Membership[];
}

const initialState: MembersState = {
    list: [],
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers(state, action: PayloadAction<Membership[]>) {
            state.list = action.payload;
        }
    },
});

export const { setMembers } = membersSlice.actions;
export default membersSlice.reducer;
