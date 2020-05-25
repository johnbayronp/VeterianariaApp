
import React,{useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';


const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [findVista, findaVistaOpcion] = useState("Crear nuevas citas");

  //Use state 
  const [citas, setCitas] = useState([ ]);

  //Eliminar un state
  const deleteCita = id => {
    setCitas((citasActuales)=> { 
      return citasActuales.filter(cita => cita.id !== id);
    })
  };

  // Mostrar o ocultar agregar cita o ver citas
  const mostrarCitas = () => {

    { mostrarForm ? findaVistaOpcion("Crear nuevas citas"): findaVistaOpcion("Ver mis citas")}
    guardarMostrarForm(!mostrarForm);

  }


  // Cerrar teclado 
  const cerrarTeclado = () => {
    Keyboard.dismiss();
    /** TouchableWithoutFeedback , para dar click fuera y sin que cambie su color */
  }

  return (
    //Container
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
      <View style={styles.container}>
        <Text style={styles.title }> Veterinaria TheWolf</Text>
        
        <View style= {styles.contenido}>

        {mostrarForm ? ( 
            <>
            <Text style={styles.title}> Crear Nueva Cita</Text>
            <Formulario
              citas = {citas}
              setCitas = {setCitas}
              guardarMostrarForm = {guardarMostrarForm}
              findaVistaOpcion = {findaVistaOpcion}
            /> 
            </>
          ) : (
          <>
            <Text style={styles.title}> {citas.length>0 ? 'Tus citas': 'No hay citas'}</Text>

            <FlatList 
              style={styles.listado}
              data = {citas}
              renderItem = {({item}) => <Cita item = {item} deleteCita = {deleteCita} /> }
              keyExtractor = { cita => cita.id }
            />
          </>)
        }
        </View>
        
        <View>
            <TouchableHighlight onPress={() => mostrarCitas()} style={styles.btnMostrarCitas}>
            <Text style={styles.textoSubmit}>{findVista}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  
  container:{
    backgroundColor:'#D66254', /*CB42A8*/
    flex:1
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    color:'white', /**  6C8A91*/
    fontWeight:'bold',
    fontSize: 20,
    marginBottom: 5
  },
  contenido:{
    flex: 1 ,
    backgroundColor:'#49AD79'/*
    marginHorizontal:'2.5%',
    marginVertical:'2.5%'
    */
  },
  listado:{
    flex:1
  },
  btnMostrarCitas:{
    /*arginTop:15,*/
    paddingVertical:15,
    backgroundColor:'#C21538'
  },
  textoSubmit:{
    color:'#FFF',
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default App;
