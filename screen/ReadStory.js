import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import db from "../config"
import { SearchBar, Icon } from 'react-native-elements';

export default class ReadScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            allStories : [],
            search : "",
        }
    }

    componentDidMount = async()=>{
        const query = await db.collection("Stories").get()
        query.docs.map((doc)=>{
            this.setState({
                allStories : [...this.state.allStories, doc.data()],
                lastStory : null,
                search :"",
            })
        });
        //console.log(this.state.allStories[0].Author);
    }

    keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.item}
            subtitle={item.description}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            bottomDivider
          />
        )
      }

      searchStories= async(text) =>{
        var enteredText = text.split("")
        var text = text.toUpperCase()
            
        if (enteredText[0].toUpperCase() ==='T'){
          const story =  await db.collection("Stories").where('Title','==',text).get()
          story.docs.map((doc)=>{
            this.setState({
              allStories:[...this.state.allTransactions,doc.data()],
              lastStory: doc
            })
          })
        }
        else if(enteredText[0].toUpperCase() === 'A'){
          const story = await db.collection('Stories').where('Author','==',text).get()
          story.docs.map((doc)=>{
            this.setState({
              allStories:[...this.state.allTransactions,doc.data()],
              lastStory: doc
            })
          })
        }
      }

    render(){
    return( 
         <ScrollView>
            <SearchBar
             placeholder="Type here..."
             onChangeText={(search)=>{
             this.setState({ search : search })
            }}
            value={this.state.search}
            searchIcon={
             <Icon
                name="search"
                color="white"
                onPress={()=>{
                this.searchStories(this.state.search);
            }}
            />
           }
            />
            {
                this.state.allStories.length === 0 ? 
                (
                 <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                 <Text style={{fontSize:40}}>Fetching the best stories...</Text>
                </View>
                )
                :(
                <FlatList
                data={this.state.allStories}
                renderItem={({item})=>(
                <View style={{borderBottomWidth: 2}}>
                <Text>{"Title: " + item.Title}</Text>
                <Text>{item.Story}</Text>
                <Text>{"Author: " + item.Author}</Text>
                </View>
                )}
                keyExtractor= {(item, index)=> index.toString()}
                bottomDivider
                />   
                )
                }
                    
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textView:{
        marginTop : 200,
        marginLeft : 500,
    },
    text:{
        fontSize: 40,
    }
})