import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getLatestGames } from './lib/metacritic';
import { Image } from 'react-native';

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {games.map((game) => (
          <View key={game.slug.slug} style={styles.listElement}>
            <Image source={{ uri: game.image }} style={styles.image} />
            <View style={styles.info}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{game.title}</Text>
                  <Text style={styles.textBase}>{game.releaseDate}</Text>
                </View>
                <View style={styles.scoreBg}>
                  <Text style={game.score < 98 ? styles.mediumScore : styles.goodScore}>{game.score}</Text>
                </View>
              </View>
              <Text style={styles.textBase}>{game.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  listElement: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
  },
  textBase: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 8,
    marginBottom: 8,
  },
  goodScore: {
    textAlign: 'center',
    color: 'green',
    fontSize: 8,
    font: 'bold',
    borderRadius: 50,
  },
  mediumScore: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 8,
    font: 'bold',
    borderRadius: 50,
  },
  scoreBg: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginLeft: 16,
    width: '60%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 'auto',
  },
});
