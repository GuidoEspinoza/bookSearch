import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import './bookDetails.css'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';

const generateSlug = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return slug;
};

const BookDetail = ({ books }) => {
    const { slug } = useParams();

    console.log('books', books);

    const bookDetails = books?.books[0];
    const book = bookDetails.find((book) => generateSlug(book.name) === slug);

    console.log('bookDetails', bookDetails);
    console.log('Book', book)

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor((row) => row.authors, {
            id: 'authors',
            header: () => 'Author',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('country', {
            header: () => 'Country',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('mediaType', {
            header: () => 'Type',
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

    const table = useReactTable({
        data: book,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    if (!book) {
        return <p>Book not found</p>;
    }

    return (
        <div className='containerBookDetails'>
            <table className='tableBookDetails'>
                <thead className='headerBookDetails'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr className='trHeaderBookDetails' key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th className='thHeaderBookDetails' key={header.id}>
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
                <tbody className='bodyBookDetails'>
                    {table.getRowModel().rows.map((row) => (
                        <tr className='trBodyBookDetails' key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td className='tdBodyBookDetails' key={cell.id}>
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
    );
};

const mapStateToProps = (state) => {
    return {
        books: state.books,
    };
};

export default connect(mapStateToProps)(BookDetail);