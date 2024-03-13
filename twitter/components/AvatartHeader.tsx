import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable } from 'react-native'

const AvatartHeader = () => {
    const navigation = useNavigation()
    return (
        <Pressable
            onPress={() => navigation.openDrawer()
            }
        >
            <Image
                src='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg'
                style={{
                    width: 40,
                    aspectRatio: 1,
                    borderRadius: 50,
                    marginLeft: 15
                }}
            />
        </Pressable >
    )
}

export default AvatartHeader