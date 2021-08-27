import {useEffect, useState} from "react";
import {LineBreak} from "../LineBreak";

function ConnectionStatus() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedStatus, setLoadedStatus] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const tokenStr = JSON.parse(token);
        fetch(
            "http://127.0.0.1:8000/api/v1/database-connections/get-status/", {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "token " + tokenStr
                }
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            setIsLoading(false);
            const x = [data.connection_status]
            setLoadedStatus(x);
        });

    }, [])

    if (isLoading) {
        return (
            <div>
                <LineBreak/>
                <p>Loading....</p>
            </div>
        );
    }

    return (
        <div>
            {loadedStatus}
        </div>
    )
}

export default ConnectionStatus;