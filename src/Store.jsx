import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./reducers/BookReducer";

// Configuración de la tienda Redux
const store = configureStore({
  reducer: {
    books: bookReducer, // Se define el reductor de libros
  }
});

export default store;
