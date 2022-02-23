import { createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';
import { AppDispatch } from "../store";
import * as uuid from "uuid"

interface Cart {
    id: string,
    productId: string,
    quantity: number
}

const initialState = {
    isLoading: false,
    error: false,
    carts: []
}

const slice = createSlice({
    name: "cart",
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

        getCartsSucess(state, action) {
            state.isLoading = false
            state.carts = action.payload.carts
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getCarts() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())
            const res = await axios.get<Cart[]>('/carts');
            if (res.data) {
                dispatch(
                    slice.actions.getCartsSucess({
                        carts: res.data
                    })
                )
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function addProductToCart(productId: string) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())

            const res = await axios.get<Cart[]>(`/carts?productId=${productId}`);

            if (res.data && res.data.length > 0) {
                const cart = res.data[0];
                cart.quantity += 1;
                await axios.put(`/carts/${cart.id}`, cart);
            } else {
                const cart = {
                    id: uuid.v4(),
                    productId,
                    quantity: 1
                };
                await axios.post(`/carts`, cart);
            }

            await getCarts();

        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function removeProductFromCart(cartId: string) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())

            await axios.delete(`/carts/${cartId}`);

            await getCarts();
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function updateCartQuantity(cartId: string, quantity: number) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())

            const res = await axios.get<Cart>(`/carts/${cartId}`);
            if (res.data) {
                const cart = res.data;

                if (quantity < 0) {
                    dispatch(slice.actions.hasError('Quantity should have to be greater than zero'))
                }

                cart.quantity = quantity;

                await axios.put(`/carts/${cart.id}`, cart);
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function clearCart(carts: Cart[]) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(slice.actions.startLoading())

            carts.forEach(async (cart) => {
                await axios.delete(`/carts/${cart.id}`);
            })

            await getCarts();
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}