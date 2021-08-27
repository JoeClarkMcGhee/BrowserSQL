import {LineBreak} from "../components/LineBreak";
import QueryDBForm from "../components/database_operations/QueryDBForm";

function QueryDB() {
    function submit() {
        console.log("post the query")
    }

    return (
        <div className='card'>
            <h2>Query Database</h2>
            <LineBreak/>
            <QueryDBForm/>
        </div>
    )
}

export default QueryDB;