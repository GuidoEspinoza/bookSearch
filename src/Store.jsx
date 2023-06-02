import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from "./reducers/BookReducer";

// Configuración de la tienda Redux
const store = configureStore({
  reducer: {
    books: bookReducer, // Se define el reductor de libros
  },
  middleware: [thunk],
});

export default store;