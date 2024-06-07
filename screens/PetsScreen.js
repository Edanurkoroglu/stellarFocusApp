import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const petsData = [
  {
    id: 1,
    name: 'Buddy',
    avgSize: '20-25 lb',
    lifeExpectancy: '12-15 Years',
    image: require('../assets/catimage.jpg'), // Local image
    motivation: 'Buddy diyor ki: "Bunu yapabilirsin! İleriye doğru adım atmaya devam et!"'
  },
  {
    id: 2,
    name: 'Max',
    avgSize: '22-31 lbs',
    lifeExpectancy: '12-15 Years',
    image: require('../assets/kopek2.jpg'), // Local image
    motivation: 'Max diyor ki: "Attığın her adım seni başarıya bir adım daha yaklaştırıyor!"'
  },
  {
    id: 3,
    name: 'Bella',
    avgSize: '55-80 lb',
    lifeExpectancy: '10-15 Years',
    image: require('../assets/labrador.jpg'), // Local image
    motivation: 'Bella diyor ki: "Odaklan ve asla pes etme!"'
  },
  {
    id: 4,
    name: 'Charlie',
    avgSize: '55-70 lb',
    lifeExpectancy: '10-12 Years',
    image: require('../assets/indir.jpg'), // Local image
    motivation: 'Charlie diyor ki: "Kendine ve sahip olduğun her şeye inan!"'
  },
  {
    id: 5,
    name: 'Lucy',
    avgSize: '55-70 lb',
    lifeExpectancy: '10-12 Years',
    image: require('../assets/images.jpg'), // Local image
    motivation: 'Lucy diyor ki: "Mükemmellik için çabalamaya devam et!"'
  },
];

const PetsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evcil hayvanını seç</Text>
      <Text style={styles.subtitle}>Yıldız kazandıkça besle!</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {petsData.map(pet => (
          <View key={pet.id} style={styles.petCard}>
            <Image source={pet.image} style={styles.petImage} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petMotivation}>{pet.motivation}</Text>
            </View>
            <TouchableOpacity style={styles.heartButton}>
              <Text style={styles.heartText}>❤️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6DAA6E',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6DAA6E',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  petInfo: {
    flex: 1,
    marginLeft: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petDetail: {
    fontSize: 14,
    color: '#777',
  },
  petMotivation: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 5,
  },
  heartButton: {
    padding: 10,
  },
  heartText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PetsScreen;
