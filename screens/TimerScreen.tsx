import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

const TimerScreen = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<string>('');
  const [countdownStarted, setCountdownStarted] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [userDocId, setUserDocId] = useState<string>('');

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(collection(FIRESTORE_DB, 'users'), user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setPoints(userData.points || 0);
            setUserDocId(userSnap.id);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    fetchUserPoints();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && countdownStarted) {
      clearInterval(interval);
      setCountdownStarted(false);
      if (parseInt(inputMinutes, 10) >= 1) {
        const newPoints = points + 1;
        setPoints(newPoints);
        savePointsToFirebase(newPoints);
        Alert.alert('30 dakika tamamlandı, bir yıldız kazandınız!');
      } else {
        Alert.alert('Geri sayım tamamlandı!');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, countdownStarted]);

  const toggleTimer = () => {
    if (!isActive && !countdownStarted && inputMinutes.trim() !== '') {
      setSeconds(parseInt(inputMinutes, 10) * 60);
      setIsActive(true);
      setCountdownStarted(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setInputMinutes('');
    setIsActive(false);
    setCountdownStarted(false);
  };

  const formattedTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const savePointsToFirebase = async (newPoints: number) => {
    try {
      if (userDocId) {
        const userRef = doc(FIRESTORE_DB, 'users', userDocId);
        await updateDoc(userRef, { points: newPoints });
      } else {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(FIRESTORE_DB, 'users', user.uid);
          await setDoc(userRef, { points: newPoints });
          setUserDocId(userRef.id);
        }
      }
    } catch (error) {
      console.error('Error saving points to Firebase:', error);
    }
  };

  return (
    <View style={[styles.background, { backgroundColor: isActive ? '#6DAA6E' : '#FFF' }]}>
      <View style={styles.container}>
        <View style={[styles.timerContainer, { borderColor: isActive ? '#FFF' : '#6DAA6E', backgroundColor: isActive ? '#6DAA6E' : '#FFF' }]}>
          <Text style={[styles.timer, { color: isActive ? '#FFF' : '#6DAA6E' }]}>{formattedTime()}</Text>
        </View>
        {!countdownStarted && (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Dakika giriniz"
            value={inputMinutes}
            onChangeText={setInputMinutes}
          />
        )}
        <Text style={[styles.modeText, { color: isActive ? '#FFF' : 'black' }]}>
          {isActive ? 'Odaklanma Vakti!' : 'Pomodoro Tamamla, Yıldızları Kap!'}
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons name={isActive ? "laptop-outline" : "happy-outline"} size={50} color={isActive ? "#FFF" : "#6DAA6E"} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleTimer}>
            <Text style={styles.buttonText}>{isActive ? 'Pause' : countdownStarted ? 'Resume' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pointsContainer}>
        
          <Text style={styles.pointsStar}>{'★'.repeat(points)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#6DAA6E',
    padding: 10,
    borderRadius: 15,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'bold'
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 15,
  },
  modeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color:'black'
  },
  iconContainer: {
    marginVertical: 20,
  },
  pointsContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#514D3F',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pointsStar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default TimerScreen;