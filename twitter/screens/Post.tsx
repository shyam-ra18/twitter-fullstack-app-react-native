import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import Tweet from '../components/Tweet';
import { useTweetsApi } from '../libs/api/tweets';

const Post = ({ route }: any) => {
    const { id }: any = route?.params; 
    const { getTweet } = useTweetsApi()
    const { data, isLoading, error } = useQuery({
        queryKey: ['tweet', id],
        queryFn: () => getTweet(id as string)
    })

    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>Tweet {id} not found ! </Text>
    }

    return (
        <Tweet tweet={data} isPress={false} />
    )
}

export default Post