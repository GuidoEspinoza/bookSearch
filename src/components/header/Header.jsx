import SwitchTheme from './SwitchTheme';

import './header.css'

function Header() {

    return (
        <>
        <div className="header">
            <span className='headerText'>Book Search</span>
            <SwitchTheme />
        </div>
        </>
    )
}

export default Header