/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, Image, ViewStyle, ImageStyle, View, TextStyle, TouchableOpacity } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import {
  LoginScreen, TodoListItemsScreen, TodoListsScreen, // @demo remove-current-line
  WelcomeScreen,
} from "../screens"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { Text } from "../components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // 🔥 Your screens go here
  TodoLists: undefined
  TodoListItems: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()
const listLinkAppLogo = require("../../assets/images/listlinkapplogo.png")
const listLinkSettingIcon = require("../../assets/images/listlinksettingicon.png")
const $headerStyle: ViewStyle = {
  height: 95,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: -10,  
  width: "100%",   
}

const $logoStyle: ImageStyle = {
  width: 50,  
  top: 10  
}

const $headerTitleStyle: TextStyle = {
  fontFamily: 'SFProBold',  
  fontWeight: "700",
  fontSize: 22,
  lineHeight: 24,
  textAlign: "center",
  letterSpacing: -0.02,
  color: "#000000",
  paddingTop: 30
}

const $settingStyle: ImageStyle = {
  width: 27,
  height: 27,
  marginTop: 30  
}

function LogoTitle() {
  return (
    <View style={$headerStyle}>      
      <Image
        style={$logoStyle}
        source={listLinkAppLogo}
        resizeMode="contain"            
      />      
    </View>
  );
}

function TextTitle() {
  return (
    <View style={$headerStyle}>
      <Text
        style={$headerTitleStyle}
        text="Travel"
      />      
    </View>
  );
}

function RightTitle() {
  return (
    <View>
      <Image
        style={$settingStyle}
        source={listLinkSettingIcon}
        resizeMode="contain"
      />   
    </View>
  );
}

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {isAuthenticated ? (
        <>
          {/* @demo remove-block-end */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          {/* @demo remove-block-start */}
          <Stack.Screen name="Demo" component={DemoNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
      <>
        <Stack.Screen name="TodoLists" component={TodoListsScreen} options={{
           headerTitle: () => <LogoTitle />,
           headerBackVisible: false,
        }} />
        <Stack.Screen 
          name="TodoListItems" 
          component={TodoListItemsScreen} 
          options={{
            headerTitle: () => <TextTitle />,
            headerBackVisible: false,
            headerRight: () => <RightTitle />,            
          }}
        />
      </>
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
