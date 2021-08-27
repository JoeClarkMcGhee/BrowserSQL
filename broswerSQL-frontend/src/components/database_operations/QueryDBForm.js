import {Component, createRef} from "react";
import ResultsTable from "./ResultsTable";
import {LineBreak} from "../LineBreak";


class QueryDBForm extends Component {
    constructor(props) {
        super(props);
        this.queryInputRef = createRef()
        this.submit = this.submit.bind(this);
        this.state = {
            queryResults: []
        }
    }

    submit(event) {
        event.preventDefault();
        const submittedData = {
            query: this.queryInputRef.current.value
        }
        const token = sessionStorage.getItem('token');
        const tokenStr = JSON.parse(token);
        fetch('http://127.0.0.1:8000/api/v1/database-connections/query-remote-db/',
            {
                method: "POST",
                body: JSON.stringify(submittedData),
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "token " + tokenStr
                }
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({queryResults: data})
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor="query-panel">Query Panel: </label>
                        <textarea rows="10" cols="50" id="query-panel" ref={this.queryInputRef}
                                  required/>
                    </div>
                    <br/>
                    <div>
                        <button className='btn'>Submit</button>
                    </div>
                </form>
                <LineBreak/>
                {
                    this.state.queryResults.length > 0 ?
                        <ResultsTable data={this.state.queryResults}/> : null
                }
            </div>
        );
    }
}

export default QueryDBForm;