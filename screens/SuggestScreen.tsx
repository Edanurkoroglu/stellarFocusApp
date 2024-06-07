import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Clipboard, Alert, Image } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const SuggestScreen = () => {
  const inviteCode = 'HKP1098HUO5TH12';

  const copyToClipboard = () => {
    Clipboard.setString(inviteCode);
    Alert.alert('Invite code copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>Arkadaşını Davet Et</Text>
        <Text style={styles.subtitle}>Birlikte Evcil Hayvanını Büyüt!</Text>
        <Image 
          source={require('../assets/invite.jpg')} // Update the path to your image
          style={styles.image}
        />

        <Text style={styles.description}>Arkadaşını davet etmek için kodu kopyala.</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{inviteCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.shareText}>Ya da şununla paylaş</Text>
      <View style={styles.shareIcons}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="facebook-messenger" size={40} color="#0084ff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={40} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="twitter" size={40} color="#1da1f2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="instagram" size={40} color="#c32aa3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 45,
    minHeight: 400, // Adjust this value as needed
  },
  image: {
    width: 150,  // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginVertical: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginVertical: 15,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    marginTop:12,
    padding: 10,
    marginVertical: 25,
    width: '100%',
    justifyContent: 'space-between',
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#86c7a1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight:'bold'
  },
  shareText: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
  },
  shareIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default SuggestScreen;
