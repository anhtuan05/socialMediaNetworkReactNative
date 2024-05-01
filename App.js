import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from './components/home/Post';
import SignIn from './components/user/SignIn';
import FSStyles from './styles/FSStyles';
import Announcement from './components/home/Announcement';
import UserInformation from './components/user/UserInformation';

const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (username, password) => {
    if (username === 'A' && password === '1') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const tabBarIconColor = FSStyles.primaryColor;
  const tabBarIconSize = 24;

  return (
    <>
      {isLoggedIn ? (
        <NavigationContainer>
          <Tab.Navigator>

            <Tab.Screen name="Home"
              options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <Entypo name="home" size={tabBarIconSize} color={tabBarIconColor} /> // Icon khi được chọn
                  ) : (
                    <AntDesign name="home" size={tabBarIconSize} color={tabBarIconColor} /> // Icon mặc định
                  )
                ),
                tabBarLabelStyle: {
                  display: 'none', // Loại bỏ từ "Home"
                },
              }}>
              {() => (
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  {/* {posts.map(postId => (
                    <Post key={postId} />
                  ))} */}
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                </ScrollView>
              )}
            </Tab.Screen>

            <Tab.Screen name="New Post"
              options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <MaterialCommunityIcons name="post-outline" size={tabBarIconSize} color={tabBarIconColor} />// Icon khi được chọn
                  ) : (
                    <MaterialIcons name="post-add" size={tabBarIconSize} color={tabBarIconColor} /> // Icon mặc định
                  )
                ),
                tabBarLabelStyle: {
                  display: 'none', // Loại bỏ từ "User"
                },
              }}>
              {() => (
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  <Post />
                </ScrollView>
              )}
            </Tab.Screen>

            <Tab.Screen name="Announcement"
              options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <FontAwesome name="bell" size={tabBarIconSize} color={tabBarIconColor} /> // Icon khi được chọn
                  ) : (
                    <FontAwesome name="bell-o" size={tabBarIconSize} color={tabBarIconColor} /> // Icon mặc định
                  )
                ),
                tabBarLabelStyle: {
                  display: 'none', // Loại bỏ từ "Announcement"
                },
              }}>
              {() => (
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  <Announcement />
                  <Announcement />
                  <Announcement />
                </ScrollView>
              )}
            </Tab.Screen>

            <Tab.Screen name="User Information"
              options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <FontAwesome name="user" size={tabBarIconSize} color={tabBarIconColor} /> // Icon khi được chọn
                  ) : (
                    <FontAwesome name="user-o" size={tabBarIconSize} color={tabBarIconColor} /> // Icon mặc định
                  )
                ),
                tabBarLabelStyle: {
                  display: 'none', // Loại bỏ từ "User"
                },
              }}>
              {() => (
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  <UserInformation />
                </ScrollView>
              )}

            </Tab.Screen>

          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        // Nếu chưa đăng nhập, hiển thị component SignIn
        <View style={styles.container}>
          <SignIn onLogin={handleLogin} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});





