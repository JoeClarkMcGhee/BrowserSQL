import {Component} from "react";
import Row from "./Row";


class ResultsTable extends Component {
    // todo: also look for "bad remote db connection"
    constructor(props) {
        super(props);
    }

    getHeader = function () {
        if (!this.props.data.includes("bad query")) {
            let keys = Object.keys(this.props.data[0]);
            return keys.map((key) => {
                return (
                    <th>
                        {key.toUpperCase()}
                    </th>
                );
            })
        }
    }

    getRows = function () {
        let items = this.props.data;
        if (!items.includes("bad query")) {
            let keys = Object.keys(this.props.data[0]);
            return items.map((row) => {
                return (
                    <tr>
                        <Row data={row} keys={keys}/>
                    </tr>
                );
            })
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        {this.getHeader()}
                    </tr>
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>
                {this.props.data.includes("bad query") ? <h2>{this.props.data}</h2> : null}
            </div>
        );
    }
}

export default ResultsTable;