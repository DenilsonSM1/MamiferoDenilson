import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { Platform } from 'react-native';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]);

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


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/dogs/search?query=${searchQuery}`
      );
      const searchedDogs: Dog[] = response.data;
      setDogs(searchedDogs);
      console.log('Cães encontrados:', searchedDogs);
    } catch (error) {
      console.error('Erro ao pesquisar cães:', error);
    }
  };
 
  

  useEffect(() => {
    
    const fetchDogs = async () => {
      try {
        const response = await axios.get('http://localhost:3333/dogs');
        const fetchedDogs: Dog[] = response.data;
        setDogs(fetchedDogs);
        console.log('Cães obtidos:', fetchedDogs);
      } catch (error) {
        console.error('Erro ao obter cães:', error);
      }
    };

   
    fetchDogs();
  }, []);

  const handleDeleteDog = async (name: string) => {
    try {
      await axios.delete(`http://localhost:3333/dogs/${name}`);
      setDogs(dogs.filter((dog) => dog.name !== name));
      console.log('Cão removido:', name);
    } catch (error) {
      console.error('Erro ao remover cão:', error);
    }
  };
  
  
  
  

  return (
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
      <TextInput
        style={styles.input}
        placeholder="Digite o nome ou descrição"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Pesquisar" onPress={handleSearch} />

      <Text style={styles.subtitle}>Lista de Cães:</Text>
      {dogs.map((dog) => (
        <View key={dog.id} style={styles.dogContainer}>
          <Text style={styles.dogInfo}>Nome: {dog.name}</Text>
          <Text style={styles.dogInfo}>Idade: {dog.age}</Text>
          <Text style={styles.dogInfo}>Descrição: {dog.description}</Text>
          <Text style={styles.dogInfo}>
            Vacinado: {dog.vaccinated ? 'Sim' : 'Não'}
          </Text>
          <Button title="Remover" onPress={() => handleDeleteDog(dog.name)} />
        </View>
      ))} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginRight: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dogContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  dogInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddDogScreen;