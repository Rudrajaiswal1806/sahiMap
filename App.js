import React, { Component } from 'react';
import {View, TouchableHighlight} from 'react-native';
import { Container, Header, Item,Content, Input, Icon, Button, Text } from 'native-base';
import MapView,  { Marker,ProviderPropType  }from 'react-native-maps';


export default class App extends Component {


constructor(props) {
    super(props);
    this.state = {
      searchText : "",
      title: "",
      latitude: 12.9870927,
      longitude: 77.6512554,
    };
  }

searchLocation = () => {
 
  fetch("https://api.opencagedata.com/geocode/v1/json?q=" +this.state.searchText+"&key=fae4c3627698429a9524e00bf8059def")
  .then(response => response.json()) 
  .then((jsonResponse)=> {
     var city = jsonResponse.results[0].components.city;
     if (city == 'Kolkata') {

       this.setState({
        title: this.state.searchText,
        latitude: jsonResponse.results[0].geometry.lat,
        longitude: jsonResponse.results[0].geometry.lng
       })
     } else {
        alert("Wrong addresss");
     }
    this.setState({
      loading: false,
    })
  })
  .catch(error=>console.log(error));
};


  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item style= {{width:50}}>
            <Icon name="ios-search" />
            <Input style= {{width:10}} placeholder="Search" onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} />
            <Button onPress={()=>{this.searchLocation()}}>
              <Text>Search</Text>
              </Button>
          </Item>
        </Header>
        <View>
             <MapView
                style= {{height:'100%',width:'100%'}}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.3922,
                  longitudeDelta: 0.3421,
                }}
                >
        <Marker
      coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
      title={this.state.title}
    />
  </MapView>
  </View>
  
      </Container>
    );


  }

}