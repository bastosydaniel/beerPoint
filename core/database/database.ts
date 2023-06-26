import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS beers (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, name TEXT, style TEXT)',
      [],
      () => {
        console.log('Tabela criada com sucesso');
      },
    );
  });
};

export const saveBeer = (beer: { brand: string | number | null; name: string | number | null; style: string | number | null; }) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO beers (brand, name, style) VALUES (?, ?, ?)',
      [beer.brand, beer.name, beer.style],
      () => {
        console.log('Cerveja salva com sucesso');
        console.log(beer);
      },
    );
  });
};

export const getBeers = (callback: (arg0: any[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM beers',
      [],
      (_, { rows }) => {
        const beers = rows._array;
        callback(beers);
      },
    );
  });
};

export const deleteAllBeers = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM beers',
      [],
      () => {
        console.log('Cervejas deletadas com sucesso');
      },
    );
  });
}
