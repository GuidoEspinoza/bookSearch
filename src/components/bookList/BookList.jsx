import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchBooks } from '../../actions/bookActions';

const BookList = ({ loading, books, error, fetchBooks }) => {

    const urlBooks = 'books';

    const [searchInput, setSearchInput] = useState('')
    const [searchBook, setSearchBook] = useState('')
    const [filteredBooks, setFilteredBooks] = useState(null);

    const dispatch = useDispatch()

    const booksFind = books?.books[0]

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchBook = () => {
        setSearchBook(searchInput)

        if (booksFind && Array.isArray(booksFind)) {
            if (searchInput.trim() === '') {
                setFilteredBooks(null);
            } else {
                const filtered = booksFind.filter((book) =>
                    book.name.toLowerCase().includes(searchInput.toLowerCase())
                );

                setFilteredBooks(filtered);
            }
        } else {
            setFilteredBooks(null);
        }
    }

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    console.log('Search Book', searchBook);
    console.log('Books Find', booksFind);
    console.log('Filtered Books', filteredBooks);

    return (
        <div>
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Buscar libro por código"
            />
            <button
                onClick={() =>
                    dispatch(fetchBooks(urlBooks), handleSearchBook())
                }
            >Buscar</button>

            <ul>
                {filteredBooks?.map((book) => (
                    <li key={book.isbn}>{book.name}</li>
                ))}
            </ul>
        </div >
    );
};

const mapStateToProps = (state) => ({
    loading: state.loading,
    books: state.books,
    error: state.error,
});

const mapDispatchToProps = {
    fetchBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);