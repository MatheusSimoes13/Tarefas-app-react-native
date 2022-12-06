import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

export default function TaskList({
  task,
  deleteTask
}) {



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => deleteTask(task.item.key)}>
        <Feather name="trash" style={styles.trashIcon}/>
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.taskNameContainer}>
            <Text style={styles.taskName}>{task.item.taskName}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    backgroundColor:'#222',
    alignItems:'center'
  },
  trashIcon:{
    fontSize:40,
    color:'#FFFFFF'
  },
  taskName:{
    fontSize:30,
    color:'#FFFFFF'
  },
  taskNameContainer:{
    alignItems:'center',
    marginLeft:15
  }
})