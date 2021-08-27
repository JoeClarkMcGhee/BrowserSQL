import {useState} from "react";

function useToken() {

    const getToken = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            return JSON.parse(token);
        } else return undefined;
    }

    const [token, setToken] = useState(getToken());

    const saveTokenToSessionStorage = token => {
        if (token) {
            sessionStorage.setItem('token', JSON.stringify(token));
            setToken(token.token);
        }
    };


    return {
        setToken: saveTokenToSessionStorage,
        token
    }
}

export default useToken;