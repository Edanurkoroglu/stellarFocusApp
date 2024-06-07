import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';
import { addDoc, } from 'firebase/firestore';
import { Entypo } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons';

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, 'todos');
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log('UPDATED')

        const todos: any[] = [];
        snapshot.docs.forEach(doc => {
          todos.push({
            id: doc.id,
            ...doc.data()
          } as Todo)
        });
        setTodos(todos)
      },
    })
    return () => subscriber();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => (error.message));
  };

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false })
    console.log('file:Home.tsx:12 addTo doc:', doc)
    setTodo('');
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`)

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    }

    const deleteItem = async () => {
      deleteDoc(ref);
    }

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && <Ionicons name="checkmark-circle" size={32} color="black" />}
          {!item.done && <Entypo name="circle" size={32} color="black" />}

          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons name="trash-outline" size={24} color="black" onPress={deleteItem} />
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder='Bir görev ekle...'
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <TouchableOpacity onPress={addTodo} style={styles.button} disabled={todo === ''}>
          <Text style={styles.buttonText}>Görev Ekle</Text>
        </TouchableOpacity>
        {todos.length > 0 && (
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo: Todo) => todo.id}
          />
        )}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff', // Hafif gri bir arka plan rengi
  },
  footer: {
    padding: 20, // Alt bölüm için padding
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    backgroundColor: '#6DAA6E',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    width: '100%', // Buton genişliğini ekran genişliğine uydur
    marginTop: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    height: 55,
    borderWidth: 1, // Kenarlık kalınlığı
    borderRadius: 10,
    paddingHorizontal: 26,
    paddingVertical: 10,
    backgroundColor: '#fff', // Hafif turuncu arka plan rengi
    borderColor: '#6DAA6E', // Kenarlık rengi
    fontSize: 18,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
