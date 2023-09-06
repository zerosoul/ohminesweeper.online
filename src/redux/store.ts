import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from 'minesweeper-redux'

const store = configureStore({
    reducer: {
        minesweeper: gameReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store
