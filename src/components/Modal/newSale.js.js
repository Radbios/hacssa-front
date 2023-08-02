import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const SaleModal = ({ visible, onClose, client_id }) => {

  const [date, setDate] = useState(new Date());
  const [product_id, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [discount_unit, setDiscountUnit] = useState(null);
  const [inventory, setInventory] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  async function createPurchase(){
    const response = await api.post("/purchases", { 
                                                  client_id: client_id,
                                                  product_id: product_id,
                                                  quantity: quantity,
                                                  discount_unit: discount_unit,
                                                  date: formatDate(date) 
    });
    setDate(new Date());
    setDiscountUnit(null);
    setProductId(null);
    setQuantity(null);
    onClose();
  }

  async function getMyInventory(){
    const response = await api.get("/myinventory");
    setInventory(response.data.data);
  }
  
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

  useEffect(() => {
    if(visible){
      getMyInventory();
    }
  }, [visible]);
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.titleModal}>Novo pagamento</Text>
            <View style={styles.inputContent}>
              <View style={styles.picker}>
                <Picker
                  selectedValue={product_id}
                  onValueChange={setProductId}
                >
                  <Picker.Item label="Selecione o produto" value="" />
                  {
                    inventory ? 
                      inventory.map(element => {
                        return(<Picker.Item key={element.id} label={element.product.name} value={element.product.id} />)
                      })
                    :
                    <Picker.Item label="Carregando..." value="" />
                  }
                </Picker>
              </View>
              <TextInput 
                  placeholder={'quantidade'}
                  onChangeText={setQuantity}
                  value={quantity}
                  style={styles.input}
                  keyboardType="numeric"
              />
              <TextInput 
                  placeholder={'desconto'}
                  onChangeText={setDiscountUnit}
                  value={discount_unit}
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
            <TouchableOpacity onPress={createPurchase} style={styles.btnAdd}>
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
    borderColor: 'gray',
  },
  picker:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleModal:{
    fontSize:25,
    fontWeight: 'bold'
  }
});

export default SaleModal;
