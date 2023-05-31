// Estado inicial del reducer de libros
const initialState = {
    loading: false, // Indica si la búsqueda de libros está en curso
    books: [], // Almacena los libros obtenidos de la búsqueda
    error: '', // Almacena el mensaje de error en caso de que la búsqueda falle
};

// Reducer de libros
const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            // Caso: se ha iniciado la solicitud de búsqueda de libros
            return {
                ...state,
                loading: true, // Establece loading en true para indicar que la búsqueda está en curso
            };
        case 'FETCH_BOOKS_SUCCESS':
            // Caso: la búsqueda de libros se ha completado con éxito
            return {
                loading: false, // Establece loading en false para indicar que la búsqueda ha finalizado
                books: action.payload, // Asigna los libros obtenidos como carga útil
                error: '', // Restablece el mensaje de error a vacío
            };
        case 'FETCH_BOOKS_FAILURE':
            // Caso: la búsqueda de libros ha fallado
            return {
                loading: false, // Establece loading en false para indicar que la búsqueda ha finalizado
                books: [], // Borra los libros almacenados
                error: action.payload, // Asigna el mensaje de error como carga útil
            };
        default:
            // Caso: acción desconocida, se mantiene el estado actual
            return state;
    }
};

export default bookReducer;
