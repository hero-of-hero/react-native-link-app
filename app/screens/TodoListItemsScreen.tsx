import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Card, Screen, Text, Toggle, ToggleProps, Button } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TodoListItems: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TodoListItems" component={TodoListItemsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

interface TodoListItem {
  guid: string
  name: string
  done: boolean
}

const todoListItemsData: Array<TodoListItem> = [
  { guid: "1", name: "Best beaches around Europe", done: false },
  {
    guid: "2",
    name: "Resources and Lectures to learn new languages like Spanish & French",
    done: false,
  },
  { guid: "3", name: "Places to visit in Berlin", done: true },
  {
    guid: "4",
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    done: false,
  },
  { guid: "5", name: "Best beaches around Europe", done: true },
  {
    guid: "6",
    name: "Resources and Lectures to learn new languages like Spanish & French",
    done: true,
  },
  { guid: "7", name: "Places to visit in Berlin", done: false },
  {
    guid: "8",
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    done: false,
  },
  {
    guid: "9",
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    done: false,
  },
  {
    guid: "10",
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    done: false,
  },
]

const backCircleIcon = require("../../assets/images/listlinkbackcircle.png")

interface TodoListItemsScreenProps extends AppStackScreenProps<"TodoListItems"> {}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export const TodoListItemsScreen: FC<TodoListItemsScreenProps> = observer(
  function TodoListItemsScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const { navigation } = _props

    return (
      <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
        backgroundColor="#F9F9F9"
      >
        <FlatList<TodoListItem>
          data={todoListItemsData}
          contentContainerStyle={$flatListContentContainer}
          renderItem={({ item }) => <TodoListItemCard key={item.guid} todoListItem={item} />}
        />     
        <View style={$footerOverlay}>
                  
        </View>
        {/* background: linear-gradient(transparent, white); */}
          <TouchableOpacity
              onPress={() => navigation.navigate("TodoLists")}
              style={$backIconWrapper}
            >
            <Image style={$backIcon} source={backCircleIcon} resizeMode="contain" />
          </TouchableOpacity>
          <View style={$bottomButtonWrapper}>
            <Button preset="default" style={$bottomButton} text="Share List" textStyle={$bottomButtonTextStyle} />
            <View
              style={$bottomButtonDivider}
            />
            <Button preset="default" style={$bottomButton} text="Request Updates" textStyle={$bottomButtonTextStyle} />
          </View> 
        
      </Screen>
    )
  },
)

const TodoListItemCard = observer(function TodoListItemCard({
  todoListItem,
}: {
  todoListItem: TodoListItem
}) {
  return (
    <Card
      style={$cardWrapper}
      verticalAlignment="force-footer-bottom"
      ContentComponent={
        <ControlledToggle
          value={todoListItem.done}
          variant="checkbox"
          label={todoListItem.name}
          containerStyle={$toggleContainerStyle}
          inputWrapperStyle={$toggleInputWrapperStyle}
          labelStyle={[$toggleLabelStyle, todoListItem.done && $toggleLabelDoneStyle]}
          inputInnerStyle={$toggleInputInnerStyle}
          inputOuterStyle={$toggleInputOuterStyle}
          inputDetailStyle={$toggleInputDetailStyle}
        />
      }
    />
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingTop: 0,
}

const $flatListContentContainer: ViewStyle = {
  // height: 55
}

const $bottomButtonWrapper: ViewStyle = {
  justifyContent: "space-around",
  flexDirection: "row",
  width: 220,
  alignSelf: "center",
  alignItems: "center",
  // marginVertical: 30,    
  backgroundColor: "#FFFFFF",
  height: 77,
  borderRadius: 37,
  shadowColor: "rgba(85, 85, 85, 0.11)",
  shadowOffset: { width: 10, height: 10 },
  shadowRadius: 33,
  position: "absolute",
  bottom: 30  
}

const $cardWrapper: ViewStyle = {
  paddingVertical: 20,
  paddingLeft: 20,
  paddingRight: 30,  
  borderWidth: 0,
  borderRadius: 0,  
  backgroundColor: "#FFFFFF",
  marginTop: 4,
  minHeight: 55,
}

const $toggleContainerStyle: ViewStyle = {
  
}

const $footerOverlay: ViewStyle = {  
  backgroundColor: "#FFFFFF",
  opacity: 0.9,
  // backgroundColor: 'red',
  height: 180,
  width: "100%",
  bottom: 0,
  position: "absolute" ,  
}

const $backIconWrapper: ViewStyle = {
  alignSelf: "center",
  position: "absolute",  
  bottom: 130,  
}

const $backIcon: ImageStyle = {
  height: 45,
  width: 45,  
}

const $bottomButton: ViewStyle = {  
  width: 83,
  padding: 0,
  borderWidth: 0,  
}

const $toggleInputWrapperStyle: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "flex-start"
}

const $toggleLabelStyle: TextStyle = {
  fontFamily: "SFPro",
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 24,
  paddingLeft: 15,  
  color: "#000000"
}

const $toggleLabelDoneStyle: TextStyle = {
  opacity: 0.28,
  textDecorationLine: 'line-through',
  textDecorationStyle: 'double',
  textDecorationColor: "#BCBCBC",

}

const $toggleInputInnerStyle: ViewStyle = {
  backgroundColor: "#000",    
}

const $toggleInputOuterStyle: ViewStyle = {  
  width: 20,
  height: 20,
  borderColor: "#000"
}

const $toggleInputDetailStyle: ImageStyle = {
  width: 14,
  height: 14,  
}

const $bottomButtonDivider: ViewStyle = {
  height: 77,
  width: 1,
  backgroundColor: "#EFEFEF"
}

const $bottomButtonTextStyle: TextStyle = {
  fontFamily: "SFPro",
  fontWeight: "700",
  fontSize: 13,
  lineHeight: 15,
}
