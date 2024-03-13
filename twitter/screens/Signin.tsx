import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../libs/api/auth';

const Signin = ({ navigation }: any) => {

  const [email, setEmail] = useState('');

  const onSignIn = async () => {
    try {
      await login({ email })
      navigation.navigate('Authenticate', {
        email
      })
    } catch (error: any) {
      Alert.alert(error.message)
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require('../assets/images/logo.png')} style={{ width: "100%" }} resizeMode="contain" />
      </View>
      <Text style={styles.label}>Sign in or Creat an account</Text>
      <TextInput
        placeholder='Email'
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={(val) => setEmail(val)}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttontext}>Sign in</Text>
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

export default Signin