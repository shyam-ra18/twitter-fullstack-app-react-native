import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Tweet from '../components/Tweet';
// import tweets from '../assets/data/tweets';
import { Link } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import PlusIcon from '../assets/Plus.svg';
import { useTweetsApi } from '../libs/api/tweets';

const Home = () => {
    const { listTweets } = useTweetsApi()


    const { data, isLoading, error } = useQuery({
        queryKey: ["tweets"],
        queryFn: listTweets,
    })


    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>{error.message} </Text>
    }


    return (
        <View style={styles.page}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Tweet tweet={item} isPress={true} />}
            />

            <Pressable style={styles.newtweetbtn}>
                <Link to={"/New-tweet"}>
                    <PlusIcon width={26} height={26} color={"white"} />
                </Link>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
    },
    newtweetbtn: {
        position: "absolute",
        bottom: 15,
        right: 15,
        backgroundColor: "#00acee",
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})

export default Home