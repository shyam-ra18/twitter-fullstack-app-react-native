import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AuthContext = createContext({})

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthTOken] = useState<string | null>(null);
    const navigation = useNavigation()
    useEffect(() => {
        if (!authToken) {
            navigation.navigate('Signin')
        }
        else {
            navigation.navigate('HomeStack')
        }
    }, [authToken])

    useEffect(() => {
        const loadAuthToken = async () => {
            const res = await AsyncStorage.getItem('authToken')
            if (res) {
                setAuthTOken(res)
            }
        }
        loadAuthToken()
    }, [])

    const updatedAuthToken = async (newToken: string) => {
        await AsyncStorage.setItem('authToken', newToken)
        setAuthTOken(newToken)
    }

    return (
        <AuthContext.Provider value={{ authToken, updatedAuthToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export const useAuth = () => useContext(AuthContext) 