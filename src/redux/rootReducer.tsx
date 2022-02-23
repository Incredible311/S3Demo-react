import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/product';
import bannerReducer from './slices/banner';
import cartReducer from './slices/cart';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  banner: bannerReducer
});

export { rootPersistConfig, rootReducer };