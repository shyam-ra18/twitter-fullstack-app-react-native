import { Link, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTweetsApi } from '../libs/api/tweets';

const NewTweet = () => {

    const [text, setText] = useState('');
    const navigation = useNavigation();
    const client = useQueryClient()
    const { createTweet } = useTweetsApi()
    
    const { mutateAsync, isLoading, error, isError } = useMutation({
        mutationFn: createTweet,
        onSuccess: (data) => {
            client.setQueriesData(['tweets'], (existingTweets) => {
                return [data, ...existingTweets]
            })
        }
    })
    const user = {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
    }

    const handleCreateTweet = async () => {
        try {
            await mutateAsync({ content: text })
            setText('')
            navigation.goBack()
        } catch (error) {
            console.log("error on create a tweet: ", error)
        }
    }

    return (
        <SafeAreaView style={styles.container} >
            {isLoading && <ActivityIndicator />}
            <View style={styles.btncontainer} >
                <Link to={"/HomeTab"} style={{ fontSize: 16, color: "black" }} >Cancel</Link>
                <TouchableOpacity onPress={handleCreateTweet} style={styles.postbtn} >
                    <Text style={styles.btntext}>Post</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputcontainer}>
                <Image src={user.image} style={styles.image} />
                <TextInput
                    placeholder="What's happening?"
                    value={text}
                    onChangeText={(val) => setText(val)}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical='top'
                    style={{ flex: 1, color: "black" }}
                    placeholderTextColor={'gray'}
                />
            </View>
            {isError && <Text>Error creating tweet ! {error.message}</Text>}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#fff',
        flex: 1
    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        borderBottomColor: "#e5e7eb",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    inputcontainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    image: {
        width: 50,
        borderRadius: 50,
        aspectRatio: 1,
        marginRight: 10
    },
    postbtn: {
        backgroundColor: "#1d9bf0",
        padding: 6,
        paddingHorizontal: 14,
        borderRadius: 16
    },
    btntext: {
        color: "#fff",
        fontWeight: "bold"
    }
})

export default NewTweet