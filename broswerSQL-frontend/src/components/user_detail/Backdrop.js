function Backdrop(props) {
    if (props.isModalVisible) {
        return <div className="backdrop"/>
    }
    return (
        <div/>
    )
}

export {Backdrop}