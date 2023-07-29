import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import api from '../../services/api';
const NewClientModal = ({ visible, onClose, getClients }) => {

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);

  async function createClient(){
    const response = await api.post("/clients", { name: name,
                                                  phone: phone,
                                                  gender: gender  
    });
    setName(null);
    setPhone(null);
    setGender(null);
    getClients();
    onClose();
  }
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text>This is a Modal in Expo!</Text>
            <View style={styles.inputContent}>
              <TextInput 
                  placeholder={'nome'}
                  onChangeText={setName}
                  value={name}
                  style={styles.input}

              />
              <TextInput 
                  placeholder={'telefone'}
                  onChangeText={setPhone}
                  value={phone}
                  style={styles.input}
              />
              <TextInput 
                  placeholder={'genero'}
                  onChangeText={setGender}
                  value={gender}
                  style={styles.input}
              />
            </View>
          </View>
          <View style={styles.btnAction}>
            <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
              <Text style={styles.text}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createClient} style={styles.btnAdd}>
              <Text style={styles.text}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define o fundo preto com transparência
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    padding: 20,
    height: 450,
    width: 350,
    justifyContent: 'space-between'
  },
  content:{
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnAction:{
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingRight: 20
  },
  btnAdd: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#0F6812"

  },
  btnCancel: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#908D8D"
  },
  text: {
    color: "white"
  },
  inputContent:{
    justifyContent: 'center',
    gap: 20
  },
  input:{
    backgroundColor: 'white',
    width: 250,
    height: 50,
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray', // Cor da borda
  },
});

export default NewClientModal;
