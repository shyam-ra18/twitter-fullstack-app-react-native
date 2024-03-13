import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import DotIcon from '../assets/Doticon.svg';
import { TweetType } from '../types/index';
import IconButton from './IconButton';
import { Link, useLinkTo, useNavigation, useRoute } from '@react-navigation/native';



interface TweetProps {
    tweet: TweetType;
    isPress: boolean;
}

const Tweet: React.FC<TweetProps> = ({ tweet, isPress }) => {

    const linkTo = useLinkTo();
    const navigation = useNavigation();

    return (
        // <Link to={{ screen: "Post" }}  >
        <Pressable style={styles.container} onPress={() =>
        (
            isPress && navigation.navigate('Post', {
                id: tweet.id
            })
        )
        }>
            <Image src={tweet?.user?.image} style={styles.userImage} />
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.name}>{tweet.user?.name}</Text>
                    <Text style={styles.userName}>@{tweet.user?.username} · 3h</Text>
                    <DotIcon width={30} color={"grey"} style={{ marginLeft: "auto", }} />
                </View>
                <Text style={styles.content}>
                    {tweet.content}
                </Text>

                {tweet.image !== null && <Image src={tweet?.image} style={styles.image} />}

                <View style={styles.tweetfooter}>
                    <IconButton text={tweet.numberOfComments} icon='comment' />
                    <IconButton text={tweet.numberOfRetweets} icon='retweet' />
                    <IconButton text={tweet.numberOfLikes} icon='heart' />
                    <IconButton text={tweet.impressions || 0} icon='chart' />
                    <IconButton icon='share' />
                </View>
            </View>
        </Pressable>
        // </Link >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
        backgroundColor: 'white'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    mainContainer: {
        marginLeft: 10,
        flex: 1
    },
    name: {
        fontWeight: '600',
        color: "black"
    },
    userName: {
        color: "grey",
        marginLeft: 6,
    },
    content: {
        color:"black",
        lineHeight: 20,
        marginTop: 5
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginTop: 10,
        borderRadius: 15
    },
    tweetfooter: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4
    }
});


export default Tweet;