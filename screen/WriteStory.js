import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class WriteStory extends React.Component{
  constructor(){
    super();
    this.state = {
      story : '',
      title : '',
      author : ''
    }
  }

  handleStory = async()=>{
    db.collection('stories').add({
      'title' : this.state.title,
      'author' : this.state.author,
      'story' : this.state.story
    });
    
    alert('Story submited');

    this.setState({
      title : '',
      author : '',
      story : ''
    });
  }
    render(){
        return(
          <KeyboardAvoidingView style = {styles.container} behaviour= 'padding' enabled>
            <View style={styles.container}>
          <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: '#000', fontSize: 30 },
          }}
        />
        <TextInput
        style = {styles.inputBox}
        placeholder = 'Story Title'
        onChangeText = {(text)=>{this.setState({title: text})}}
        />
     <TextInput
        style = {styles.inputBox}
        placeholder = 'Author'
        onChangeText = {(text)=>{this.setState({author: text})}}
        />
     <TextInput
        style = {styles.inputBox1}
        placeholder = 'Write Your Story'
        onChangeText = {(text)=>{this.setState({story: text})}}
        />
         <TouchableOpacity 
              style={styles.submitButton}
              onPress = {this.handleStory}>
              <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    inputBox:{
        width : 180,
        height: 50,
        margin : 20,
        borderWidth: 1.5,
        borderRightWidth: 1,
        fontSize: 20,
        alignSelf :'center',
        textAlign : 'center'
      },
      inputBox1:{
        width : 380,
        height: 250,
        margin : 20,
        borderWidth: 1.5,
        borderRightWidth: 1,
        fontSize: 20,
        alignSelf :'center',
        textAlign : 'center'
      },
      submitButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
        width: 80,
        height: 40,
        alignSelf: 'center'
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
      },
});