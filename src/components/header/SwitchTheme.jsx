import React, { useState, useEffect } from 'react';
import './switchTheme.css';

const SwitchTheme = () => {
    // Estado para controlar si el modo oscuro está activado o no
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Estado para controlar el modo del tema (Light o Dark)
    const [themeMode, setThemeMode] = useState('Light mode');

    // Estado para controlar el ícono del tema (sol o luna)
    const [iconTheme, setIconTheme] = useState('/icon-sun.svg');

    useEffect(() => {
        // Efecto secundario que se ejecuta cuando cambia el estado de isDarkMode
        if (!isDarkMode) {
            // Si el modo oscuro está desactivado, se agrega la clase 'light-mode' al body
            document.body.classList.add('light-mode');
        } else {
            // Si el modo oscuro está activado, se remueve la clase 'light-mode' del body
            document.body.classList.remove('light-mode');
        }
    }, [isDarkMode]);

    const toggleColorMode = () => {
        // Función para cambiar el estado de isDarkMode y actualizar los estados de themeMode e iconTheme
        setIsDarkMode(!isDarkMode);
        isDarkMode === true
            ? setIconTheme('/icon-moon.svg') // Si el modo oscuro está activado, se cambia el ícono a la luna
            : setIconTheme('/icon-sun.svg'); // Si el modo oscuro está desactivado, se cambia el ícono al sol
        isDarkMode === true
            ? setThemeMode('Dark mode') // Si el modo oscuro está activado, se establece el tema en 'Dark'
            : setThemeMode('Light mode'); // Si el modo oscuro está desactivado, se establece el tema en 'Light'
    };

    return (
        <>
            <label
                className="switchTheme"
                onClick={toggleColorMode}
            >
                <span className="textSwitchMode">{themeMode}</span>
                <img
                    src={iconTheme}
                    alt="Switch Mode Logo"
                    className="iconSwitchMode"
                    width={20}
                    height={20}
                />
            </label>
        </>
    );
};

export default SwitchTheme;