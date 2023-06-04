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
    <View >
    <Text>Adicionar Cão</Text>
    <TextInput
      
      placeholder="Nome"
      value={name}
      onChangeText={setName}
    />
    <TextInput
      
      placeholder="Idade"
      value={age}
      onChangeText={setAge}
      keyboardType="numeric"
    />
    <TextInput
      
      placeholder="Descrição"
      value={description}
      onChangeText={setDescription}
    />
    <View >
      <Text >Vacinado:</Text>
      <Button
        title={vaccinated ? 'Sim' : 'Não'}
        onPress={() => setVaccinated(!vaccinated)}
      />
    </View>
    <Button title="Adicionar" onPress={handleAddDog} />
  </View>
  )
};

export default AddDogScreen;