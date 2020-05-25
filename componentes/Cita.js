
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';


const Cita = ({item,deleteCita}) => {    

    const dialogoEliminar = id => {
        console.log('Eliminando...', id);
        deleteCita(id); 
    }
    
    return(
        <View style={styles.cita}> 
            <View>
                <Text style={styles.label}> Paciente:</Text>
                <Text style={styles.texto}> {item.paciente} </Text>
            </View>

            <View>
                <Text style={styles.label}> Propietario:</Text>
                <Text style={styles.texto}> {item.dueño} </Text>
            </View>
        
            <View>
                <Text style={styles.label}> Sintomas:</Text>
                <Text style={styles.texto}> {item.sintomas} </Text>
            </View>

            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
  
    cita:{
        backgroundColor:'white',
        borderBottomColor:'#C1DEE3',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical:15,
        paddingHorizontal:10
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:10
    },
    texto:{
        fontSize:18,
        fontFamily:'sans-serif',
        textAlign:'center',
        fontStyle:'italic'
        
    },
    btnEliminar:{
        paddingVertical:10,
        backgroundColor:'red',
        marginTop:5
    },
    textoEliminar:{
        color:'#FFF',
        textAlign:'center',
        fontWeight:'bold'
    }
  });
  

export default Cita;
