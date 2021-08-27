import UserDetail from "./UserDetail";

function UserDetailList(props) {

    return (
        <ul>
            {
                props.userData.map((user) => {
                    return <UserDetail
                        key={user.id}
                        id={user.id}
                        email={user.email}
                        name={user.username}
                        isModalVisible={props.isModalVisible}
                        onClick={props.onClick}
                        onCancel={props.onCancel}
                        onDelete={props.onDelete}
                    />;
                })
            }
        </ul>
    );
}

export default UserDetailList;

