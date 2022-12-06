import { child, get, push, ref, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import TaskList from "./src/components/TaskList"
import { database } from "./src/firebaseConnection"

export default function App() {

  const [newTask, setNewTask] = useState('')

  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    get(child(database,'tasks'))
    .then((snapshot) => {
      if (snapshot.exists()){
        let array = []
        snapshot.forEach( (item) => {
          let data = {
            key:item.key,
            taskName: item.val().taskName
          }
          array.push(data)
          
        })
        setTaskList(array)
        // console.log(array)
      } else {
        console.log('n tem tarefa!!')
      }
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  const addTask = () => {
    // let task = push(database,'tasks').key
    push(child(database,'tasks'),{
      taskName: newTask
    }).key
  }

  const deleteTask = (key) => {
    console.log(key)
  }

  // console.log(taskList)

  return(
    <SafeAreaView>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="o que vai fazer hoje?"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addTaskButton} onPress={() => addTask()}>
          <Text style={styles.addTask}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      keyExtractor={item => item.key}
      data={taskList}
      renderItem={item => <TaskList task={item}/>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerTask:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    height:100,
    paddingVertical:20
  },
  input:{
    borderColor:'#000000',
    borderWidth:2,
    padding:10,
    marginRight:5,
    backgroundColor:'#FFFFFF',
  },
  addTask:{
    fontSize:20,
    backgroundColor:'#000000',
    color:'#FFFFFF',
    padding:12
  },
  addTaskButton:{
  }
})