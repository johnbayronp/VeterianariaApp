
import React,{useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';

import shortid from "shortid";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({citas,setCitas,guardarMostrarForm,findaVistaOpcion}) => {

    // Datos del formulario
    const [paciente, guardarPaciente] = useState('');
    const [dueño, guardarDueño] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    // Creamos unas variables para guardar hora y fecha
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    // -----------------------     Fecha y hora - dependencia ----
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // ----------------------- FECHA ------------------------
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        //convertir fecha - con funcion tolocaleString
        const opciones = {year:'numeric', month:'long', day:"2-digit"};
        guardarFecha(date.toLocaleString('es-Es',opciones));
        hideDatePicker();
    };
    // End -- Fecha

    // ------------------------    HORA  ---------------------
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        // convertimos la hora  - con funcion tolocalestring
        const opciones = {hour:'numeric', minute:'2-digit'};
        guardarHora(hora.toLocaleString('es-US',opciones));
        hideTimePicker();
    };
    // End -- Hora

    // Crear una nueva cita 
    const crearCitaNueva = () => {
        // Validaciones
        if(paciente.trim() === ''|| dueño.trim() === '' || telefono.trim() === '' 
        || sintomas.trim() === '' || fecha.trim() === '' || hora.trim() === ''){
                mostrarAlerta();
                return;
        }

        // Crear una nueva cita 
        const cita = { paciente , dueño, telefono, fecha, hora, sintomas};
        cita.id = shortid.generate();

        const citaNueva = [...citas,cita]
        setCitas(citaNueva);

        // Ocultar el formulario    y cambiar mensaje de button
        guardarMostrarForm(false);
        findaVistaOpcion("Crear nuevas citas");


        // resetear los campos 
        console.log(cita);

    };

    // Muestra de alerta si falla la validacion

    const mostrarAlerta =  () => {
        Alert.alert(
            'Error', // Titulo
            'Todos campos son obligatorios', // mensaje
            [{
                text:'OK' // Arreglo de botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText = {(texto)=>guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText = {(texto)=>guardarDueño(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText = {(texto)=>guardarTelefono(texto)}
                        keyboardType= 'numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha: <Text style= {styles.sub}>{fecha}</Text></Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale = 'es_ES'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Hora: <Text style= {styles.sub}>{hora}</Text></Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Síntomas:</Text>
                    <TextInput 
                        multiline
                        style={styles.input}
                        onChangeText = {(texto)=>guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={() => crearCitaNueva()} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear una nueva cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor:'#FFF',
        paddingHorizontal:25,
        paddingBottom:30,
        paddingTop:10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 6
    },
    input: {
        marginTop:2,
        height:50,
        borderColor:'#e1e1e1',
        borderWidth:1,
        borderStyle:'solid'
    },
    btnSubmit:{
        marginTop:15,
        marginBottom:30,
        paddingVertical:15,
        backgroundColor:'#299E77'
    },
    textoSubmit:{
        color:'#FFF',
        textAlign:'center',
        fontWeight:'bold'
    },
    sub:{
        color:'#F12F20',
        fontSize: 18,
        marginTop: 6
    }

});

export default Formulario;