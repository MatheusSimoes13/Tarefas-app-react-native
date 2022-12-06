import { child, get, push, ref, remove, set, update } from "firebase/database"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from "react-native"
import TaskList from "./src/components/TaskList"
import { database } from "./src/firebaseConnection"

export default function App() {

  const inputRef = useRef(null)

  const [newTask, setNewTask] = useState('')

  const [taskList, setTaskList] = useState([])
  const [editKey, setEditKey] = useState('')
  const [editing, setEditing] = useState(false)

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
  },[taskList])

  const addTask = () => {

    if(editKey !== ''){
      update(child(child(database,'tasks'),editKey),{
        taskName: newTask
      })
      .then(res => console.log('foi'))
      .catch(err => console.log(err))

      Keyboard.dismiss()
      setNewTask('')
      setEditKey('')
      setEditing(false)
      return
    }
    // let task = push(database,'tasks').key
    let key = push(child(database,'tasks'),{
      taskName: newTask
    }).key
    setTaskList(taskList,{
      key: key,
      taskName: newTask
    })
    let array = taskList
    array.push({
      key: key,
      taskName: newTask
    })
    setTaskList(array)
  }

  const editTask = (data) => {
    setEditing(true)
    setEditKey(data.item.key)
    setNewTask(data.item.taskName)
    inputRef.current.focus()
    
  }

  const deleteTask = (key) => {
    remove(child(child(database, 'tasks'),key))
    .then(res => console.log(res))
    .catch(err  => console.log(err))
    setTaskList(taskList.filter(key => key!=key))
  }
  // console.log(taskList)

  return(
    <SafeAreaView>
      {editing &&
        <Text style={styles.editing}>Você está editando uma tarefa</Text>
      }
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="o que vai fazer hoje?"
          value={newTask}
          onChangeText={text => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.addTaskButton} onPress={() => addTask()}>
          <Text style={styles.addTask}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      keyExtractor={item => item.key}
      data={taskList}
      renderItem={item => <TaskList editTask={editTask} deleteTask={deleteTask} task={item}/>}
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
    paddingVertical:20,
  },
  input:{
    borderColor:'#000000',
    borderWidth:2,
    padding:10,
    marginRight:5,
    backgroundColor:'#FFFFFF',
    width:'80%'
  },
  addTask:{
    fontSize:20,
    backgroundColor:'#000000',
    color:'#FFFFFF',
    padding:12,
  },
  editing:{
    textAlign:'center',
    fontSize:20,
    color:'#FF1100',
    marginTop:12
  }
})