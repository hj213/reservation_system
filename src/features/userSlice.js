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
                duration: '20', 
                status: 'UNUSED' 
            },
            { 
                id: 1, 
                duration: '40', 
                status: 'UNUSED' 
            },
        ],
        class: [],
        
    },
    reducers: {
        useTicket: (state, action) => {
            const duration = action.payload;
            const ticketIndex = state.tickets.findIndex((item)=> item.duration === duration);
            state.tickets[ticketIndex].status = "USED";

        }, 
        unUseTicket: (state, action) => {
            const duration = action.payload;
            const ticketIndex = state.tickets.findIndex((item)=> item.duration === duration);
            state.tickets[ticketIndex].status = "UNUSED";

        },
        regiClass: (state, action) => {
            const [duration, time, tutorID] = action.payload;

            state.class = [
                ...state.class,
                {
                'duration': duration,
                'time': time,
                'tutorID': tutorID
                }
            ]
        },
        removeClass: (state, action) => {
            const {duration, time, tutorID} = action.payload;

            state.class = state.class.filter(item => 
                !(item.duration === duration && item.time === time && item.tutorID === tutorID)
            );
        }

    }
});

export const {useTicket, unUseTicket, regiClass,removeClass} = userSlice.actions;
export default userSlice.reducer;