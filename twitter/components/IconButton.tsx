import { View, Text } from 'react-native'
import React from 'react'
import Chat from '../assets/Chat.svg';
import Reshare from '../assets/Reshare.svg';
import Share from '../assets/Share.svg';
import Bars from '../assets/Bars.svg';
import Like from '../assets/Like.svg';

interface IconButtonsProps {
    icon: string,
    text?: string | number
}

const IconButton = ({ icon, text }: IconButtonsProps) => {
    switch (icon) {
        case 'comment':
            return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Chat width={20} height={20} color={"gray"} />
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 4 }}>{text}</Text>
            </View>
            )
        case 'retweet':
            return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Reshare width={20} height={20} color={"gray"} />
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 4 }}>{text}</Text>
            </View>)
        case 'heart':
            return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Like width={20} height={20} color={"gray"} />
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 4 }}>{text}</Text>
            </View>)
        case 'chart':
            return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Bars width={20} height={20} color={"gray"} />
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 4 }}>{text}</Text>
            </View>)
        case 'share':
            return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Share width={20} height={20} color={"gray"} />
            </View>)
        default:
            return null
    }
}

export default IconButton