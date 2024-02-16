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
        availableTime: {
            20: {
                "5": 'AVAILABLE',
                "5:30": 'AVAILABLE',
                "6": 'AVAILABLE',
                "6:30": 'AVAILABLE',
              },
              40: {
                "5": 'AVAILABLE',
                "6": 'AVAILABLE',
              },
        },
        class: null
    },
    {
        id:2,
        name: 'Bao',
        info:{
            school: 'Yale University',
            major: 'Ethnicity, Race and Migration',
            response: 100,
        },
        availableTime: {
            20: {
                "6": 'AVAILABLE',
                "6:30": 'AVAILABLE',
                "7": 'AVAILABLE',
                "7:30": 'AVAILABLE',
              },
              40: {
                "6": 'AVAILABLE',
                "7": 'AVAILABLE',
              },
        },
        class: null
    },
    { 
        id:3,
        name: 'Aadhya',
        info:{
            school: 'New York University',
            major: 'Finance',
            response: 0,
        },
        availableTime: {
            20: {
                "6": 'AVAILABLE',
                "7": 'AVAILABLE',
                "8": 'AVAILABLE',
            },
            40: {
                "8": 'AVAILABLE',
            },
        },
        class: null
    },
    {
        id:4,
        name: 'Joey',
        info:{
            school: 'University of Oxford',
            major: 'Engineering',
            response: 100,
        },
        availableTime: {
            20: {
                "6": 'AVAILABLE',
                "7": 'AVAILABLE',
                "8": 'AVAILABLE',
            },
            40: {
                "8": 'AVAILABLE',
            },
        },
        class: null
    },
    {
        id:5,
        name: 'Ross',
        info:{
            school: 'New York University',
            major: 'Paleontology',
            response: 80,
        },
        availableTime: {
            20: {
                "6": 'AVAILABLE',
                "10": 'AVAILABLE',
            },
            40: {
                "6": 'AVAILABLE',
                "10": 'AVAILABLE',
            },
        },
        class: null
    },
    {
        id:6,
        name: 'Monica',
        info:{
            school: 'New York University',
            major: 'Public Health',
            response: 100,
        },
        availableTime: {
            20: {
                "6": 'AVAILABLE',
                "7": 'AVAILABLE',
            },
            40: {
                "6": 'AVAILABLE',
                "7": 'AVAILABLE',
            },
        },
        class: null
    },
]

const tutorSlice = createSlice({
    name: 'tutors',
    initialState: tutorsList,
    reducers: {
        
    }
});

// export const {use20Ticket, use40Ticket} = userSlice.actions;
export default tutorSlice.reducer;