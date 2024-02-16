import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            id: 1,
            name: "윤효정",
            role: 'tutee',
        },
        tickets: [
            { 
                id: 1, 
                duration: 20, 
                status: 'UNUSED' 
            },
            { 
                id: 1, 
                duration: 40, 
                status: 'UNUSED' 
            },
        ],
        class: null,
        
    },
    reducers: {
        use20Ticket: (state) => {
            state.tickets[0].status = 'USED'
        },
        use40Ticket: (state) => {
            state.tickets[1].status = 'USED'
        },

    }
});

export const {use20Ticket, use40Ticket} = userSlice.actions;
export default userSlice.reducer;