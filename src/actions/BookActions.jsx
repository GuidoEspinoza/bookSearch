// Esta es una función llamada fetchBooks que acepta una URL de libros como parámetro
export const fetchBooks = (urlBooks) => {
    return async (dispatch) => {
        try {
            // Dispatch de una acción de solicitud de búsqueda de libros
            dispatch({ type: 'FETCH_BOOKS_REQUEST' });

            // URL base de la API
            let url = 'https://anapioficeandfire.com/api/';

            // Si se proporciona una URL de libros adicional, se agrega a la URL base
            if (urlBooks) {
                url += urlBooks;
            }

            // Realiza una solicitud HTTP GET a la URL construida
            const response = await fetch(url);

            // Convierte la respuesta en formato JSON en un objeto JavaScript
            const data = await response.json();

            // Dispatch de una acción de éxito de búsqueda de libros, pasando los datos obtenidos como carga útil
            dispatch({
                type: 'FETCH_BOOKS_SUCCESS',
                payload: [data],
            });
        } catch (error) {
            // Dispatch de una acción de fallo de búsqueda de libros, pasando el mensaje de error como carga útil
            dispatch({
                type: 'FETCH_BOOKS_FAILURE',
                payload: error.message,
            });
        }
    };
};