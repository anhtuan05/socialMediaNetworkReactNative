import { useContext } from "react"
import { Button } from "react-native"
import FSContext from "../../FSContext";

export default Logout = ()=>{
    const [user, dispatch] = useContext(FSContext);

    const logout = () => {
        dispatch({
            'type': 'logout'
        })
    }

    return <Button title="Logout" onPress={logout}></Button>
}