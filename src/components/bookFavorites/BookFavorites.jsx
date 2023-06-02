import { Link } from 'react-router-dom';

import './bookFavorites.css'

const BookFavorites = () => {


    return (
        <div className='containerBookFavorites'>
        <Link className='backToHome' to='/'>Back to home</Link>
            <h1 className='titleFormNewBook'>Favorites</h1>
        </div>
    )
}

export default BookFavorites