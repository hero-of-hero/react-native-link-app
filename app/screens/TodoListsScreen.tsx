import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  Animated  
} from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Button, Card, Screen, Text } from "../components"
import SelectDropdown from "react-native-select-dropdown"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { GestureHandlerRootView } from "react-native-gesture-handler"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TodoLists: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TodoLists" component={TodoListsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface TodoList {
  guid: string
  name: string
  total: number
  done: number
  notify: string
  view: number
}

const todoListsData: Array<TodoList> = [
  { guid: "1", name: "Splink Shop 2.0 Design", total: 6, done: 3, notify: "On", view: 149 },
  { guid: "2", name: "Quick Tasks ( Jenna )", total: 12, done: 2, notify: "Off", view: 35 },
  { guid: "3", name: "XYZ Feedback", total: 8, done: 4, notify: "Off", view: 71 },
  { guid: "4", name: "Shopping List", total: 20, done: 8, notify: "On", view: 83 },
  { guid: "5", name: "Home related", total: 14, done: 11, notify: "Off", view: 21 },
]

const listTypes: string[] = ["All Lists", "My Lists", "Subscribed", "Archived"]

const listLinkCheckIcon = require("../../assets/images/listlinkcheckicon.png")
const listLinkSoundIcon = require("../../assets/images/listlinksoundicon.png")
const listLinkEyeIcon = require("../../assets/images/listlinkeyeicon.png")
const listLinkMenuIcon = require("../../assets/images/listlinkmenuicon.png")
const listLinkPlusIcon = require("../../assets/images/listlinkaddicon.png")
const listLinkDownloadIcon = require("../../assets/images/listlinkdownloadicon.png")
const listLinkCaretDownIcon = require("../../assets/images/listlinkcaretdownicon.png")

interface TodoListsScreenProps extends AppStackScreenProps<"TodoLists"> {}

export const TodoListsScreen: FC<TodoListsScreenProps> = observer(function TodoListsScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { navigation } = _props

  function goTodoListItems() {
    navigation.navigate("TodoListItems")
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
      backgroundColor="#F9F9F9"
    >
      <FlatList<TodoList>
        data={todoListsData}
        contentContainerStyle={$flatListContentContainer}
        ListHeaderComponent={
          <SelectDropdown
            data={listTypes}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            defaultButtonText={"Lists"}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            buttonStyle={$dropdownBtnStyle}
            buttonTextStyle={$dropdownBtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <Image style={$caretDownIcon} source={listLinkCaretDownIcon} resizeMode="contain" />
              )
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={$dropdownStyle}
            rowStyle={$dropdownRowStyle}
            rowTextStyle={$dropdownRowTxtStyle}
          />
        }
        renderItem={({ item }) => (
          <TodoListCard key={item.guid} todoList={item} onPress={goTodoListItems} />
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <View style={$todoListFooterWrapper}>
              <Image style={$todoListFooterIcon} source={listLinkMenuIcon} resizeMode="contain" />
              <Image style={$todoListFooterIcon} source={listLinkPlusIcon} resizeMode="contain" />
              <Image
                style={$todoListFooterIcon}
                source={listLinkDownloadIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        }
      />
    </Screen>
  )
})

const rightSwipeActions = function(
  _progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) {   
    const scaleX =dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });
    const translateX = dragX.interpolate({
      inputRange: [-200, -150, -100, -50, 0],
      outputRange: [0, 50, 100, 150, 200],
      extrapolate: 'clamp',
    }); 
    console.log(dragX, scaleX, translateX)
    const $animatedStyle = { transform: [
      // {
      //   scaleX,        
      // },
      {
        translateX    
      },
    ]}

  return (
    <Animated.View style={[
      $swipeArea,
      $animatedStyle
    ]}>
      <Button preset="default" style={$swipeShareText} text="Share List" textStyle={$swipeButtonTextStyle} />
      <Button preset="default" style={$swipeUpdateText} text="Request Updates" textStyle={$swipeButtonTextStyle} />
      <Button preset="default" style={$swipeDeleteText} text="Delete" textStyle={$swipeButtonTextStyle} />      
    </Animated.View>
    
  ) 
}



const TodoListCard = observer(function TodoListCard({
  todoList,
  onPress,
}: {
  todoList: TodoList
  onPress: () => void
}) {
  const [isSwipe, setIsSwipe] = React.useState(false)
  const swipeOpen = () => {
    setIsSwipe(true)
  }
  const swipeClose = () => {
    setIsSwipe(false)
  }

  return (
    <GestureHandlerRootView style={$gestureHandler}>
      <Swipeable 
        renderRightActions={rightSwipeActions} 
        // onSwipeableOpen={swipeOpen}        
        onSwipeableClose={swipeClose}
        onSwipeableWillOpen={swipeOpen}
      >
        <Card
          style={[$cardWrapper, isSwipe && $cardWrapperOverride]}
          verticalAlignment="force-footer-bottom"
          onPress={onPress}
          content={todoList.name}
          contentStyle={$cardContent}
          FooterComponent={
            <View style={$cardFooterWrapper}>
              <View style={$cardFooterContentWrapper}>
                <Image
                  style={$todoListContentIcon}
                  source={listLinkCheckIcon}
                  resizeMode="contain"
                />
                <Text
                  style={$cardFooterContentText}
                  text={`${todoList.done} / ${todoList.total}`}
                />
              </View>
              <View style={$cardFooterContentWrapper}>
                <Image
                  style={$todoListContentIcon}
                  source={listLinkSoundIcon}
                  resizeMode="contain"
                />
                <Text style={$cardFooterContentText} text={todoList.notify} />
              </View>
              <View style={$cardFooterContentWrapper}>
                <Image style={$todoListContentIcon} source={listLinkEyeIcon} resizeMode="contain" />
                <Text style={$cardFooterContentText} text={`${todoList.view}`} />
              </View>
            </View>
          }
        />
      </Swipeable>
    </GestureHandlerRootView>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingTop: 0,
}

const $flatListContentContainer: ViewStyle = {
  padding: 18,
}

const $todoListFooterWrapper: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  width: 220,
  alignSelf: "center",
  alignItems: "center",
  marginVertical: 30,
  paddingVertical: 20,
  paddingHorizontal: 30,
  backgroundColor: "#FFFFFF",
  height: 77,
  borderRadius: 37,
  shadowColor: "rgba(85, 85, 85, 0.11)",
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 33,
}

const $cardWrapper: ViewStyle = {
  paddingTop: 20,
  paddingLeft: 24,
  paddingRight: 30,
  marginBottom: 12,
  minHeight: 100,
  borderWidth: 0,
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 20,
  shadowColor: "rgba(0, 0, 0, 0.04)",
}

const $cardWrapperOverride: ViewStyle = {
  borderTopEndRadius: 0,
  borderBottomEndRadius: 0,
  // backgroundColor: "#000"
}

const $cardContent: TextStyle = {
  fontFamily: "SFProHeavy",
  fontWeight: "900",
  fontSize: 17,
  lineHeight: 19,
}

const $cardFooterWrapper: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: 15,
}

const $cardFooterContentWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: 70,
}

const $cardFooterContentText: TextStyle = {
  fontFamily: "SFProBold",
}

const $todoListContentIcon: ImageStyle = {
  height: 18,
  width: 24,
  marginRight: 10,
}

const $todoListFooterIcon: ImageStyle = {
  height: 28,
  width: 26,
}

const $dropdownBtnStyle: ViewStyle = {
  width: "100%",
  height: 50,
  backgroundColor: "#FFF",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#000000",
  paddingHorizontal: 20,
  marginBottom: 20,
}

const $dropdownBtnTxtStyle: TextStyle = {
  fontFamily: "SFProBold",
  fontWeight: "600",
  fontSize: 15,
  lineHeight: 16,
  color: "#000000",
  textAlign: "left",
  marginHorizontal: 0,
}

const $dropdownStyle: ViewStyle = {
  backgroundColor: "#FFF",
  padding: 20,
  marginTop: -25,
  borderRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 24,
  shadowColor: "rgba(0, 0, 0, 0.08)",
  flex: 1,
  height: 240,
}

const $dropdownRowStyle: ViewStyle = {
  borderBottomWidth: 0,
}

const $dropdownRowTxtStyle: TextStyle = {
  fontFamily: "SFProBold",
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 16,
  color: "#000",
  textAlign: "left",
}

const $caretDownIcon: ImageStyle = {
  width: 13,
}

const $swipeArea: ViewStyle = {  
  flexDirection: "row",
  justifyContent: "center",  
  marginBottom: 12,
  right: 0,  
}

const $swipeDeleteText: TextStyle = {  
  width: 67,
  padding: 10,
  borderWidth: 0, 
  backgroundColor: "#FE7411",
  borderRadius: 0,
  borderTopEndRadius: 12,
  borderBottomEndRadius: 12,
}

const $swipeUpdateText: TextStyle = {  
  width: 67,
  padding: 10,
  borderWidth: 0, 
  backgroundColor: "#622CCC",
  borderRadius: 0
}


const $swipeShareText: TextStyle = {  
  width: 67,
  padding: 10,
  borderWidth: 0, 
  backgroundColor: "#FF2DAA",
  borderRadius: 0,
}

const $swipeButtonTextStyle: TextStyle = {
  fontFamily: "SFPro",
  fontWeight: "700",
  fontSize: 11,
  lineHeight: 13,
  color: "#FFFFFF",
}

const $gestureHandler: ViewStyle = {
  flex: 1
}

