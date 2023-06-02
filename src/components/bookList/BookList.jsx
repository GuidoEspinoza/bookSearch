import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchBooks } from '../../actions/bookActions';
import { Link } from 'react-router-dom';

import './bookList.css'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';

const BookList = ({ loading, books, error, fetchBooks }) => {
    // URL para la obtención de libros
    const urlBooks = 'books';

    // Estado para el valor del input de búsqueda
    const [searchInput, setSearchInput] = useState('');
    // Estado para almacenar los libros filtrados
    const [filteredBooks, setFilteredBooks] = useState(null);

    // Obtener el primer libro del arreglo de libros
    const booksFind = books?.books[0];

    // Obtener el dispatch de Redux
    const dispatch = useDispatch();
    // Crear una instancia de columnHelper
    const columnHelper = createColumnHelper();

    // Definir las columnas de la tabla
    const columns = [
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: (info) => (
                // Crear un link en el nombre del libro y que sea considerado como slug para la url
                <Link to={`/books/${generateSlug(info.getValue())}`}>
                    {info.getValue()}
                </Link>
            ),
        }),
        columnHelper.accessor((row) => row.authors, {
            id: 'authors',
            header: () => 'Author',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('numberOfPages', {
            header: () => 'Pages',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('released', {
            header: () => 'Released',
            cell: (info) => {
                // Formaterar fecha
                const date = new Date(info.getValue());
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}/${month}/${day}`;
                return formattedDate;
            },
        }),
    ];

    // Generar un slug a partir del nombre del libro
    const generateSlug = (name) => {
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        return slug;
    };

    // Crear una instancia de la tabla utilizando el hook useReactTable
    const table = useReactTable({
        data: filteredBooks,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    // Manejar el cambio de valor del input de búsqueda
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Manejar la búsqueda de libros
    const handleSearchBook = () => {
        if (booksFind && Array.isArray(booksFind)) {
            if (searchInput !== '') {
                const filtered = booksFind.filter((book) => {
                    // Buscar libro por nombre o autor
                    const nameMatch = book.name.toLowerCase().includes(searchInput.toLowerCase());
                    const authorsMatch = book.authors && book.authors.some((author) =>
                        author.toLowerCase().includes(searchInput.toLowerCase())
                    );
                    return nameMatch || authorsMatch;
                });
                setFilteredBooks(filtered);
            } else {
                setFilteredBooks(null);
            }
        }
    };

    // Mostrar un mensaje de carga si loading es true
    if (loading) {
        return <h2>Cargando...</h2>;
    }

    // Mostrar un mensaje de error si error es true
    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <>
            <div className='containerBookList'>
                <div className='searchBookList'>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        placeholder="Search book by Name or Author"
                        className='inputBookList'
                    />
                    <button
                        className='btnBookList'
                        onClick={() =>
                            dispatch(fetchBooks(urlBooks), handleSearchBook())
                        }
                    >
                        Search
                    </button>
                    <button className='btnAddNewBook'>
                    <Link to='/form-new-book'>Add New Book</Link>
                    </button>
                    <button className='btnFavorites'>
                    <Link to='/favorites'>Favorites</Link>
                    </button>
                </div>
                {filteredBooks && filteredBooks.length > 0 ? (
                    <div>
                        <h1 className='titleBookList'>Book List</h1>
                        <table className='tableBookList'>
                            <thead className='headerBookList'>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr className='trHeaderBookList' key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th className='thHeaderBookList' key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className='bodyBookList'>
                                {table.getRowModel().rows.map((row) => (
                                    <tr className='trBodyBookList' key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td className='tdBodyBookList' key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h1 className='notFoundBookList'>No books were found.</h1>
                )}
            </div>
        </>
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
