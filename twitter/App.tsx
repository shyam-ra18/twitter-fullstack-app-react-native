import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import HomeIcon from './assets/HomeIcon.svg';
import Bookmarks from './drawer/Bookmarks';
import Index from './drawer/Index';
import TwitterBlue from './drawer/TwitterBlue';
import Home from './screens/Home';
import NewTweet from './screens/NewTweet';
import Post from './screens/Post';
import User from './screens/User';
import AvatartHeader from './components/AvatartHeader';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Signin from './screens/Signin';
import Authentication from './screens/Authentication';
import AuthContextProvider from './context/Authcontext';
import TweetApiContextProvider from './libs/api/tweets';



const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

const client = new QueryClient()

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={Home} options={{
        title: "Twitter",
        headerTitleAlign: "center",
        tabBarIcon: () => (
          <HomeIcon width={30} height={30} color={"#00acee"} />
        ),
        headerLeft: () => <AvatartHeader />
      }} />
      <Tab.Screen name="UserTab" component={User} options={{
        title: "Account",
        headerTitleAlign: "center",
        tabBarIcon: () => (
          <HomeIcon width={30} height={30} color={"#00acee"} />
        )
      }} />
    </Tab.Navigator>

  );
};
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ fontSize: 20, textAlign: "center", marginVertical: 5, color: "black" }}>Shyam</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Home" component={StackNavigate} options={{ headerShown: false }} />
      <Drawer.Screen name="Index" component={Index} />
      <Drawer.Screen name="Bookmark" component={Bookmarks} />
      <Drawer.Screen name="Twitterblue" component={TwitterBlue} />
    </Drawer.Navigator>
  )
}

const StackNavigate = () => {
  return (
    <AuthContextProvider>
      <TweetApiContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
          <Stack.Screen name="Authenticate" component={Authentication} options={{ headerStyle: { backgroundColor: '#e9e9e9' }, title: 'Confirm Account' }} />
          <Stack.Screen name="HomeStack" component={HomeTab} options={{ headerShown: false }} />
          <Stack.Screen name="Post" component={Post} options={{ title: "Post" }} />
          <Stack.Screen name="New-tweet" component={NewTweet} options={{ headerShown: false, title: "New Tweet" }} />
        </Stack.Navigator>
      </TweetApiContextProvider>
    </AuthContextProvider>
  )

}


function App(): JSX.Element {

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <DrawerStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}


export default App;
