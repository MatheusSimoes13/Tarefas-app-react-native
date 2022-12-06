import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

export default function TaskList(task) {

  console.log(task)
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="trash" style={styles.trashIcon}/>
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback >
          <View style={styles.taskNameContainer}>
            <Text style={styles.taskName}>{task.task.item.taskName}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  },
  trashIcon:{
    fontSize:50
  },
  taskName:{
    fontSize:30
  },
  taskNameContainer:{
    alignItems:'center'
  }
})