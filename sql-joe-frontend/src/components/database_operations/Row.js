function Row (props) {
    return props.keys.map((key, idx) => {
        return (
            <td>
                {props.data[key]}
            </td>
        );
    })
}

export default Row