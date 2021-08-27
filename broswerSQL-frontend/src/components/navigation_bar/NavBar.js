import {Link} from "react-router-dom";

import styleClasses from './NavBar.module.css'

function NavBar() {
    function logOut() {
        sessionStorage.removeItem("token")
        window.location.reload()
    }

    // todo: conditionally show nav bar items based on user class
    return (
        <header className={styleClasses.header}>
            <div className={styleClasses.logo}>BrowserSQL</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Query DB</Link>
                    </li>
                    <li>
                        <Link to='/connect'>Connect</Link>
                    </li>
                    <li>
                        <Link to='/manage-users'>Manage Users</Link>
                    </li>
                    <li>
                        <Link onClick={logOut}>Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;