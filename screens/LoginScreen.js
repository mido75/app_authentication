import { useContext, useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);
    async function loginUserHandler({ email, password }) {
        setIsAuthenticating(true);
        try{
            const token = await login(email, password);
            authCtx.authenticate(token);
        }catch(error){
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
        }
        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }

  return <AuthContent isLogin onAuthenticate={loginUserHandler} />;
}

export default LoginScreen;