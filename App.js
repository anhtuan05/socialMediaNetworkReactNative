import React, { useReducer } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from './components/home/Post';
import FSStyles from './styles/FSStyles';
import UserInformation from './components/user/UserInformation';
import Survey from './components/home/Survey';
import FSUserReducer from './FSUserReducer';
import FSContext from './FSContext';
import SignIn from './components/user/SignIn';


const Tab = createBottomTabNavigator();

export default function App() {

  const tabBarIconColor = FSStyles.primaryColor;
  const tabBarIconSize = 24;

  const [user, dispatch] = useReducer(FSUserReducer, null);

  return (
    <FSContext.Provider value={[user, dispatch]}>
      {user!==null ? (
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
                  <Survey />
                </ScrollView>
              )}
            </Tab.Screen>

            <Tab.Screen name="Survey"
              options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <MaterialCommunityIcons name="text-box-search" size={tabBarIconSize} color={tabBarIconColor} /> // Icon khi được chọn
                  ) : (
                    <MaterialCommunityIcons name="text-box-search-outline" size={tabBarIconSize} color={tabBarIconColor} /> // Icon mặc định
                  )
                ),
                tabBarLabelStyle: {
                  display: 'none',
                },
              }}>
              {() => (
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  <Survey />
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
                <ScrollView>
                  <UserInformation />
                </ScrollView>
              )}

            </Tab.Screen>

          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        // Nếu chưa đăng nhập, hiển thị component SignIn
        <View style={styles.container}>
          <SignIn />
        </View>
      )}
    </FSContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});





