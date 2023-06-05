import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import './bookFormNew.css';

const BookFormNew = () => {
    // Estado para los valores del formulario
    const [formData, setFormData] = useState({
        bookName: '',
        bookAuthor: '',
        bookType: '',
        bookReleased: ''
    });

    // Estado para los errores del formulario
    const [formErrors, setFormErrors] = useState({});

    // Manejar el cambio de valor en los inputs del formulario
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};

        // Validar campos requeridos
        if (formData.bookName.trim() === '') {
            errors.bookName = 'Book name is required.';
        }
        if (formData.bookAuthor.trim() === '') {
            errors.bookAuthor = 'Book author is required.';
        }
        if (formData.bookType.trim() === '') {
            errors.bookType = 'Book type is required.';
        }
        if (formData.bookReleased.trim() === '') {
            errors.bookReleased = 'Released date is required.';
        }

        // Mostrar mensajes de error y éxito según la validación
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all the required fields.'
            });
        } else {
            setFormErrors({});
            Swal.fire({
                icon: 'success',
                title: 'Form submitted!',
                text: 'The book has been successfully added.'
            });
        }
    };

    return (
        <div className='containerBookFormNew'>
            <Link className='backToHome' to='/'>Back to home</Link>
            <h1 className='titleFormNewBook'>Form New Book</h1>
            <form className='formNewBook' onSubmit={handleSubmit}>
                <div className='inputsForm'>
                    <div>
                        <label htmlFor="bookName">Book Name</label>
                        <input type="text" id="bookName" placeholder='Write book name' value={formData.bookName} onChange={handleInputChange} />
                        {formErrors.bookName && <span className="errorBookFormNew">{formErrors.bookName}</span>}
                    </div>
                    <div>
                        <label htmlFor="bookAuthor">Book Author</label>
                        <input type="text" id="bookAuthor" placeholder='Write book author' value={formData.bookAuthor} onChange={handleInputChange} />
                        {formErrors.bookAuthor && <span className="errorBookFormNew">{formErrors.bookAuthor}</span>}
                    </div>
                    <div>
                        <label htmlFor="bookType">Book Type</label>
                        <input type="text" id="bookType" placeholder='Write book type' value={formData.bookType} onChange={handleInputChange} />
                        {formErrors.bookType && <span className="errorBookFormNew">{formErrors.bookType}</span>}
                    </div>
                    <div>
                        <label htmlFor="bookReleased">Released</label>
                        <input type="text" id="bookReleased" placeholder='Write book released date' value={formData.bookReleased} onChange={handleInputChange} />
                        {formErrors.bookReleased && <span className="errorBookFormNew">{formErrors.bookReleased}</span>}
                    </div>
                </div>
                <button className='btnSubmitForm' type="submit">Add new form</button>
            </form>
        </div>
    );
};

export default BookFormNew;