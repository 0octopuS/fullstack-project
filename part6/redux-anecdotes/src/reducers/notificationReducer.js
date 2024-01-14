// 6.12 Extend the component so that it renders the message stored in the Redux store
import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        clearNotification: () => {
            return '';
        },
    },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

// 6.19  enables one to provide the notification with time
export const setTimedNotification = (text, durationInSeconds) => {
    return (dispatch) => {
        dispatch(setNotification(text));

        // Automatically clear the notification after the specified duration
        setTimeout(() => {
            dispatch(clearNotification());
        }, durationInSeconds * 1000);
    };
};