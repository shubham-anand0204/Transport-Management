// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import personalDetailsReducer from './slices/personalDetailsSlice';
import bankDetailsReducer from './slices/bankDetailsSlice';
import gstDetailsReducer from './slices/gstDetailsSlice';
import documentsUploadReducer from './slices/documentsUploadSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalDetails: personalDetailsReducer,
    bankDetails: bankDetailsReducer,
    gstDetails: gstDetailsReducer,
    documents: documentsUploadReducer,
  },
});

export default store;
