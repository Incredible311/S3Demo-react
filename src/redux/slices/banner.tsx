import { createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';
import { AppDispatch } from "../store";

export interface Banner {
    id: string;
    description: string;
    photo: string;
}

const initialState = {
    isLoading: false,
    error: false,
    banners: []
}

const slice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },

        endLoading(state) {
            state.isLoading = false
        },

        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },

        getBannersSucess(state, action) {
            state.isLoading = false
            state.banners = action.payload.banners
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getBanners() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())
            const res = await axios.get<Banner[]>('banners');
            if (res.data) {
                dispatch(
                    slice.actions.getBannersSucess({
                        banners: res.data
                    })
                )
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}