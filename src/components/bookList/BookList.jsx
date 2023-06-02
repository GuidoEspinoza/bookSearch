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

    const urlBooks = 'books';

    const [searchInput, setSearchInput] = useState('')
    const [filteredBooks, setFilteredBooks] = useState(null);

    const booksFind = books?.books[0]

    const dispatch = useDispatch()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: (info) => (
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
        columnHelper.accessor('country', {
            header: () => 'Country',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('released', {
            header: () => 'Released',
            cell: (info) => {
                const date = new Date(info.getValue());
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}/${month}/${day}`;
                return formattedDate;
            },
        }),
    ]

    const generateSlug = (name) => {
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        return slug;
    };

    const table = useReactTable({
        data: filteredBooks,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchBook = () => {

        if (booksFind && Array.isArray(booksFind)) {
            if (searchInput !== '') {
                const filtered = booksFind.filter((book) => {
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

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    // console.log('Search Input', searchInput);
    // console.log('Books Find', booksFind);
    console.log('Filtered Books', filteredBooks);

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
                    >Search</button>
                </div>
                {filteredBooks && filteredBooks.length > 0 ? (
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
                ) : (
                    <p className='notFoundBookList'>No books were found.</p>
                )}
            </div >
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