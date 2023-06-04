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
  
};

export default AddDogScreen;