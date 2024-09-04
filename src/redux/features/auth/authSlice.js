import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, sentOtp } from "../../../services/User.service";
import jwt_decode from "jwt-decode";


import { AUTH_TOKEN } from "../../../utils/constants";
import { errorToast } from "../../../components/Utility/Toast";


const initialState = {
    isAuthorized: false,
    user: null,
    role: null,
    tempLoginObj: null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk("auth/login", async (payload) => {
    try {
        let { data: res } = await loginUser(payload);
        let decodedToken = await jwt_decode(res.token);
        localStorage.setItem(AUTH_TOKEN, res.token);
        return {
            user: decodedToken.user,
            token: res.token,
            role: decodedToken.role,
        };
    } catch (error) {
        errorToast(error);
        throw error;
    }
});

export const otpSend = createAsyncThunk("auth/otpSend", async (payload) => {
    try {
        let { data: res } = await sentOtp(payload);
        console.log(res)
        return {
            otpObj: {
                otp: "",
                isOtpSent: true
            }
        };
    } catch (error) {
        errorToast(error);
        throw error;
    }
});




export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: () => {
            return initialState;
        },
    },
    extraReducers: {
        [otpSend.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [otpSend.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.tempLoginObj = payload.otpObj;
        },
        [otpSend.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.tempLoginObj = null;
        },

        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.role = payload.role;
            state.token = payload.token;
            state.isAuthorized = true;
            state.tempLoginObj = null;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.token = null;
            state.role = null;
            state.user = null;
            state.isAuthorized = false;
            state.tempLoginObj = null
        },

    },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
