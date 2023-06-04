import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

interface Dog {
  id: number;
  name: string;
  age: number;
  description: string;
  vaccinated: boolean;
}
let nextId = 1;


const AddDogScreen = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [vaccinated, setVaccinated] = useState(false);

  const handleAddDog = async () => {
    const newDog: Dog = {
      id: nextId++,
      name,
      age: parseInt(age),
      description,
      vaccinated,
    };
  
    try {
      const response = await axios.post('http://localhost:3333/create', newDog);
      console.log('Cão adicionado:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar cão:', error);
    }
  };



  return(
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Cão</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Vacinado:</Text>
        <Button
          title={vaccinated ? 'Sim' : 'Não'}
          onPress={() => setVaccinated(!vaccinated)}
        />
      </View>
      <Button title="Adicionar" onPress={handleAddDog} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginRight: 8,
    color: '#333',
  },
});

export default AddDogScreen;