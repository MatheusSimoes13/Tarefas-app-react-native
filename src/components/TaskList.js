import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

export default function TaskList({
  task,
  deleteTask,
  editTask
}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => deleteTask(task.item.key)}>
        <Feather name="trash-2" color={'#FFFFFF'} size={30}/>
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback onPress={() => editTask(task)}>
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
    alignItems:'center',
    paddingLeft:8
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