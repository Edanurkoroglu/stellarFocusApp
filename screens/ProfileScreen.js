import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../firebase'; // Ensure correct import of Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email || '');
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || '');
          setPoints(userData.points || 0);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  const handleSettings = () => {
    navigation.navigate('Ayarlar');
  };
  const handlePassword = () => {
    navigation.navigate('Password');
  };
  const handleSuggest = () => {
    navigation.navigate('Suggest');
  };
  const handleFavorites = () => {
    navigation.navigate('Favorites');
  };
  const handlePets = () => {
    navigation.navigate('Hayvanlarım');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome name="user-circle" size={100} color="#333" />
        <Text style={styles.nameText}>{userName}</Text>
      </View>
      <View style={styles.contactInfo}>
        <FontAwesome name="envelope" size={18} color="grey" />
        <Text style={styles.contactText}>{userEmail}</Text>
      </View>
      <View style={styles.walletOrdersContainer}>
        <View style={styles.walletOrders}>
          <Text style={styles.walletOrdersText}>🐱</Text>
          <Text style={styles.walletOrdersLabel}>Evcil Hayvanım</Text>
        </View>
        <View style={styles.walletOrders}>
          <Text style={styles.walletOrdersText}>
            {'★'.repeat(points)}
          </Text>
          <Text style={styles.walletOrdersLabel}>Skorlarım</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleFavorites} style={styles.menuItem}>
        <FontAwesome name="heart" size={24} color="#6DAA6E" />
        <Text style={styles.menuItemText}>Favorilerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePets} style={styles.menuItem}>
        <FontAwesome5 name="dog" size={24} color="#6DAA6E" />
        <Text style={styles.menuItemText}>Evcil Hayvanlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSuggest} style={styles.menuItem}>
        <FontAwesome name="users" size={24} color="#6DAA6E" />
        <Text style={styles.menuItemText}>Arkadaşını Davet Et</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePassword} style={styles.menuItem}>
        <FontAwesome name="key" size={24} color="#6DAA6E" />
        <Text style={styles.menuItemText}>Şifremi Unuttum</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettings} style={styles.menuItem}>
        <FontAwesome name="cog" size={24} color="#6DAA6E" />
        <Text style={styles.menuItemText}>Ayarlar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <FontAwesome name="power-off" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#f4f4f8',
    borderRadius: 15,
    width: '98%',
    height: 185,
    padding: 18,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'grey',
  },
  walletOrdersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  walletOrders: {
    alignItems: 'center',
  },
  walletOrdersText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  walletOrdersLabel: {
    fontSize: 16,
    color: 'grey',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DAA6E',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'white',
  },
});

export default ProfileScreen;
