import {Route, Switch} from 'react-router-dom'

import ConnectToDB from './pages/ConnectToDB';
import ManageUsers from "./pages/ManageUsers";
import QueryDB from "./pages/QueryDB";
import NavBar from "./components/navigation_bar/NavBar";
import LogInForm from "./pages/LogInForm";
import useToken from "./components/useToken";


function App() {
    const {token, setToken} = useToken();

    if (!token) {
        return <LogInForm setToken={setToken}/>
    }

    return (
        <div>
            <NavBar/>
            <main>
                <Switch>
                    <Route path="/" exact>
                        <QueryDB/>
                    </Route>
                    <Route path="/connect">
                        <ConnectToDB/>
                    </Route>
                    # todo: add a form to manage users to create a user
                    <Route path="/manage-users">
                        <ManageUsers/>
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
