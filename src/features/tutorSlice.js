import { createSlice } from '@reduxjs/toolkit';

const tutorsList = [
    {
        id:1,
        name: 'Dominic',
        info:{
            school: 'University of Oxford',
            major: 'Japanese and Korean Studies',
            response: 100,
        },
        twenty: ['24-2-20-11','24-2-20-11.5','24-2-22-14','24-2-22-14.5'],
        forty: ['24-2-20-11','24-2-22-7'],
        class: []
    },
    {
        id:2,
        name: 'Bao',
        info:{
            school: 'Yale University',
            major: 'Ethnicity, Race and Migration',
            response: 100,
        },
        twenty: ['24-2-22-14','24-2-22-14.5','24-2-23-7',],
        forty: ['24-2-22-14','24-2-23-7'],
        class: []
    },
    { 
        id:3,
        name: 'Aadhya',
        info:{
            school: 'New York University',
            major: 'Finance',
            response: 0,
        },
        twenty: ['24-2-23-10','24-2-23-10.5'],
        forty: ['24-2-23-10'],
        class: []
    },
    {
        id:4,
        name: 'Joey',
        info:{
            school: 'University of Oxford',
            major: 'Engineering',
            response: 100,
        },
        twenty: ['24-2-21-18','24-2-21-18.5'],
        forty: ['24-2-21-18'],
        class: []
    },
    {
        id:5,
        name: 'Ross',
        info:{
            school: 'New York University',
            major: 'Paleontology',
            response: 80,
        },
        twenty: ['24-2-21-18','24-2-21-18.5','24-2-23-7','24-2-23-7.5'],
        forty: ['24-2-21-18','24-2-23-7'],
        class: []
    },
    {
        id:6,
        name: 'Monica',
        info:{
            school: 'New York University',
            major: 'Public Health',
            response: 100,
        },
        twenty: ['24-2-21-8','24-2-21-8.5','24-2-23-7','24-2-23-7.5'],
        forty: ['24-2-21-8','24-2-23-7'],
        class: []
    },
]

const tutorSlice = createSlice({
    name: 'tutors',
    initialState: tutorsList,
    reducers: {
        tutorRegiClass: (state, action) => {
            const [duration, time, tutorID, tuteeID] = action.payload;

            const tutorIndex = state.findIndex(item => item.id === tutorID);
            
            state[tutorIndex].class = [
                ...state[tutorIndex].class,
                {
                'duration': duration,
                'time': time,
                'tuteeD': tuteeID
                }
            ];
        },
        tutorRemoveClass: (state, action) => {
            const {duration, time, tutorID, tuteeID} = action.payload;

            const tutorIndex = state.findIndex(item => item.id === tutorID);

            state[tutorIndex].class = state[tutorIndex].class.filter(item => 
                !(item.duration == duration 
                    && item.time == time 
                    && item.tuteeID == tuteeID ));
            
         },
         tutorAddTime: (state, action) => {
            const {duration, time, tutorID} = action.payload;

            const tutorIndex = state.findIndex(item => item.id === tutorID);

            if(duration === '20')
                state[tutorIndex].twenty = [...state[tutorIndex].twenty, time];
            else
                state[tutorIndex].forty = [...state[tutorIndex].forty, time];

         },
         tutorRemoveTime: (state, action) => {
            const [duration, time, tutorID] = action.payload;

            const tutorIndex = state.findIndex(item => item.id === tutorID);

            if(duration === '20')
                state[tutorIndex].twenty = state[tutorIndex].twenty.filter(item => item !== time);
            else
                state[tutorIndex].forty = state[tutorIndex].forty.filter(item => item !== time);
         }
    }
});

export const {tutorRegiClass, tutorRemoveClass, tutorAddTime, tutorRemoveTime} = tutorSlice.actions;
export default tutorSlice.reducer;