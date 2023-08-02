import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';

const PaymentModal = ({ visible, onClose, client_id }) => {

  const [value, setValue] = useState(null);

  async function createPayment(){
    console.log(formatDate(date))
    const response = await api.post("/payments", { client_id: client_id,
                                                  value: value,
                                                  date: formatDate(date) 
    });
    setDate(new Date());
    setValue(null);
    onClose();
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    showMode('date');
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  function formatDate(date){
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.titleModal}>Novo cliente</Text>
            <View style={styles.inputContent}>
              <TextInput 
                  placeholder={'valor'}
                  onChangeText={setValue}
                  value={value}
                  style={styles.input}
                  keyboardType="numeric"
              />
              <TouchableOpacity onPress={showDatepicker} style={styles.dateInputBtn}>
                <Text>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <View style={styles.btnAction}>
            <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
              <Text style={styles.text}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createPayment} style={styles.btnAdd}>
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
  dateInputBtn:{
    backgroundColor: 'white',
    width: 250,
    height: 50,
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
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
  titleModal:{
    fontSize:25,
    fontWeight: 'bold'
  }
});

export default PaymentModal;
