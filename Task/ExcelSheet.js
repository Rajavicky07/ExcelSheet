import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, RefreshControl, View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import adobe from '../assets/adobe.jpg';

function ExcelSheet() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = useCallback(() => {     
  
    setLoading(true);
    return fetch('http://192.168.0.116:8080/api/excel/getData')  
      .then(response => response.json())       
      .then(json => {
        setData(json);
        setLoading(false);
      })  
      .catch(error => {
        console.error('Error fetching data: ', error);   
        setLoading(false);  
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false)).catch((error) => {
      console.error('Error during refresh:', error);
      setRefreshing(false);
    });
  }, [fetchData]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={adobe} style={styles.image}>
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.form}>
        <Text style={styles.texthead}>Employee Data</Text>
        <View style={styles.table}>
          <ScrollView style={[styles.scrollView, styles.tableScrollView]}>
            {data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                {row.map((cell, cellIndex) => (
                  <View key={cellIndex} style={styles.tableCell}>
                    <Text style={styles.cellText}>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 40,
    },
    scrollView: {
      width: '100%',
    },
    tableScrollView: {
      height: 540, 
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    table: {
      margin: 20,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    tableCell: {
      flex: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 5,
      paddingVertical: 15,
    },
    cellText: {
      textAlign: 'center',
    },
    form: {
      backgroundColor: '#fff',
      borderRadius: 20,
      width: '95%',
    },
    texthead: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 15,
    }
  });
  

export default ExcelSheet;