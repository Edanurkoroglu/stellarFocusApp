import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';
import { FontAwesome } from '@expo/vector-icons';

export interface Note {
  title: string;
  id: string;
}

const AddNoteScreen = ({ navigation }: any) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const noteRef = collection(FIRESTORE_DB, 'notes');
    const unsubscribe = onSnapshot(noteRef, (snapshot) => {
      const loadedNotes: Note[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
      setNotes(loadedNotes);
    });

    return () => unsubscribe();
  }, []);

  const addNote = async () => {
    if (note.trim()) {
      await addDoc(collection(FIRESTORE_DB, 'notes'), { title: note });
      setNote('');
    }
  };

  const renderNote = ({ item }: { item: Note }) => {
    const ref = doc(FIRESTORE_DB, `notes/${item.id}`);

    const deleteItem = async () => {
      await deleteDoc(ref);
    };

    return (
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>{item.title}</Text>
        <FontAwesome name="trash" size={24} color="black" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Bir not ekle...'
          onChangeText={setNote}
          value={note}
        />
      </View>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={addNote} style={styles.button} disabled={!note.trim()}>
          <Text style={styles.buttonText}>Not Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff', // Hafif gri bir arka plan rengi
  },
  list: {
    flex: 1, // Liste büyümesine izin verir
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', // Footer arka planının farklılaşmasını sağlar
  },
  button: {
    backgroundColor: '#6DAA6E',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    width: '100%', // Buton genişliğini ekran genişliğine uydur
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
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
  
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15, // Not konteynerleri arasındaki dolgu miktarını artırır
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    marginVertical:5,
    marginHorizontal: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  noteText: {
    fontSize: 18,
  },
});


export default AddNoteScreen;
