import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import BeerService from './core/services/BeerService';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState,useEffect } from 'react';
import { Beer } from './models/Beer';
import { initDatabase,getBeers,saveBeer, deleteAllBeers } from './core/database/database';
import { Card, IconButton, List, Modal} from 'react-native-paper';

export default function App() {

  const {beer,getRandBeer} = BeerService();
  const [beerList,setBeerList] = useState<Beer[]>([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


const beerItem = {
  id: beer?.id || null,
  brand: beer?.brand || '',
  name: beer?.name || '',
  style: beer?.style || '',
};

  useEffect(() => {
    initDatabase();
    loadBeers();
  }, []);


  const loadBeers = () => {
    getBeers((data) => {
      setBeerList(data);
    });
  };
    
  const renderBeerItem = (beer: { id: Key | null | undefined; brand: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; style: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {
    return (
      <View key={beer.id} >
      <List.Accordion 
        style={styles.beers} 
        title={beer.name} 
        id={beer.id?.toString()}
        left={props => <List.Icon {...props} icon="beer" />}
        >
        <List.Item style={styles.beersInfo} title={"Brand: "+beer.brand} />
        <List.Item style={styles.beersInfo} title={"Style: "+beer.style}/>
      </List.Accordion>
        {/* <Text>Name: {beer.name}</Text>
        <Text>Brand: {beer.brand}</Text>
        <Text>Style: {beer.style}</Text> */}
      </View>
    );
  };

 const SaveBeerOnDB = (beer: Beer|undefined) => {
    const beerItem = {
      id: beer?.id || null,
      brand: beer?.brand || '',
      name: beer?.name || '',
      style: beer?.style || '',
    };
    if (beerItem.id === null) {
      return;
    }
    saveBeer(beerItem);
  }



  return (
    <View style={styles.container}>
      <Button
        title="Get Random Beer"
        onPress={() => getRandBeer().then((data) => SaveBeerOnDB(beer)).then(() => loadBeers())}
      ></Button>
      <Text></Text>
      {/* <Button
        title="delete"
        onPress={() => deleteAllBeers()}
      ></Button> */}

{beer && (
        <>
          <Text>Brand: {beer.brand}</Text>
          <Text>Name: {beer.name}</Text>
          <Text>Style: {beer.style}</Text>
          <Text>Hop: {beer.hop}</Text>
          <Text>Yeast: {beer.yeast}</Text>
          <Text>Malts: {beer.malts}</Text>
          <Text>IBU: {beer.ibu}</Text>
          <Text>Alcohol: {beer.alcohol}</Text>
          <Text>BLG: {beer.blg}</Text>
        </>)}
        <Text></Text>
        <List.AccordionGroup>

        <FlatList
        ListHeaderComponent={<Text>Beer List</Text>}
        ListHeaderComponentStyle = {styles.header}
        data={beerList}
        renderItem={({ item }) => renderBeerItem(item)}
        keyExtractor={(item) => item.id.toString()}
        />
        </List.AccordionGroup>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beers: {
    backgroundColor: '#f58e2f',
    borderRadius: 10,
    width: 300,
    marginBottom: 10,
  },
  beersInfo:{
    width: 250,
    marginTop: 0,
    marginBottom:10,
    backgroundColor: '#BB8EDF',
    borderRadius: 10,
  }

});


