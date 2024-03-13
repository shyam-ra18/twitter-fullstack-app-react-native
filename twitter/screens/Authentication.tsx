import { View, Text, Pressable, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { authenticate } from '../libs/api/auth';
import { useAuth } from '../context/Authcontext';

const Authentication = ({ route, navigation }: any) => {
    const [code, setCode] = useState('');
    const { email }: any = route?.params;
    const { updatedAuthToken } = useAuth()

    const onAuthenticate = async () => {
        if (typeof email !== "string") return;
        try {
            const res = await authenticate({ email, emailToken: code })
            await updatedAuthToken(res.authToken);
            // navigation.navigate('HomeStack')
        } catch (error: any) {
            Alert.alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logocontainer}>
                <Image source={require('../assets/images/logo.png')} style={{ width: "100%" }} resizeMode="contain" />
            </View>
            <Text style={styles.label}>Confirm your email</Text>
            <TextInput
                placeholder='Enter authentication code '
                placeholderTextColor={"gray"}
                value={code}
                onChangeText={(val) => setCode(val)}
                style={styles.input}
            />

            <Pressable style={styles.button} onPress={onAuthenticate}>
                <Text style={styles.buttontext}>Confirm</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e9e9e9",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    label: {
        fontSize: 22,
        color: "gray",
        marginBottom: 40
    },
    input: {
        padding: 12,
        fontSize: 16,
        borderColor: "black",
        borderRadius: 12,
        borderWidth: 1,
        width: "80%",
        color: "black",
        marginBottom: 20
    },
    button: {
        width: "80%",
        padding: 14,
        backgroundColor: "#1DA1F2",
        borderRadius: 12,
        alignItems: 'center',
    },
    buttontext: {
        fontSize: 14,
        textAlign: "center",
        color: "white"
    },
    logocontainer: {
        width: '40%',
        alignItems: 'center',
    },
})

export default Authentication