import { createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';
import { AppDispatch } from "../store";

export interface Product {
    id: string,
    name: string,
    price: string,
    currency: string,
    description: string,
    photo: string
}

const initialState = {
    isLoading: false,
    error: false,
    products: []
}

const slice = createSlice({
    name: "product",
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

        getProductsSucess(state, action) {
            state.isLoading = false
            state.products = action.payload.products
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getProducts(page: number, limit: number) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())

            const res = await axios.get<Product[]>(`/products?_page=${page}&_limit=${limit}`);

            if (res.data) {
                dispatch(
                    slice.actions.getProductsSucess({
                        products: res.data
                    })
                )
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export async function getProductByID(id: string) {
    try {
        
        const res = await axios.get<Product>(`/products/${id}`);
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}