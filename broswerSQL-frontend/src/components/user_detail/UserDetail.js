import {Backdrop} from "./Backdrop";
import {ConfirmationModal} from "./ConfirmationModal";

function UserDetail(props) {
    // todo: use an isAdmin function
    if (props.name === "joe.clark-mcghee") {
        return <div/>
    }
    return (
        <div>
            <li className='list'>
                {props.email + " - " + props.name}
                <button className='btn' value='delete-user' onClick={props.onClick}>Delete</button>
                <ConfirmationModal onCancel={props.onCancel}
                                   onDelete={props.onDelete}
                                   id={props.id}
                                   isModalVisible={props.isModalVisible}
                />
                <Backdrop isModalVisible={props.isModalVisible}/>
            </li>
            <br/>
        </div>
    )
}

export default UserDetail;