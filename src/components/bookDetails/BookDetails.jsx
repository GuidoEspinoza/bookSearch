import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './bookDetails.css'

// Función para generar un slug a partir del nombre del libro
const generateSlug = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return slug;
};

const BookDetail = ({ books }) => {
    const { slug } = useParams(); // Obtener el slug de los parámetros de la URL

    const bookDetails = books?.books[0];
    const book = bookDetails.find((book) => generateSlug(book.name) === slug); // Encontrar el libro correspondiente al slug

    // Obtener fecha y formatearla
    const date = new Date(book.released);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;

    if (!book) {
        return <p>Book not found</p>; // Si el libro no existe, mostrar un mensaje de "Book not found"
    }

    return (
        <div className='containerBookDetails'>
            <Link className='backToHome' to='/'>Back to home</Link>
            <h1 className='titleBookDetails'>Book details</h1>
            <div className='bookDetails'>
                <p className='bookDetailsName'><strong>Book name: </strong>{book.name}</p>
                <div className='bookOtherDetails'>
                    <span><strong>Author: </strong>{book.authors}</span>
                    <span><strong>Type: </strong>{book.mediaType}</span>
                </div>
                <div className='bookOtherDetails'>
                    <span><strong>Publisher: </strong>{book.publisher}</span>
                    <span><strong>Country: </strong>{book.country}</span>
                </div>
                <div className='bookOtherDetails'>
                    <span><strong>Book Id: </strong>{book.isbn}</span>
                    <span><strong>Released: </strong>{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        books: state.books,
    };
};

export default connect(mapStateToProps)(BookDetail);