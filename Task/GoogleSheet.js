import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import mild2 from '../assets/mild2.jpg';

function GoogleSheet() {        

  const [data, setData] = useState([]);          
  const API_KEY = 'AIzaSyD4mlEFoxJzG_KxH6nVCC6CF8T6sDBX1xo'; 
  const SHEET_ID = '1qBRoI5btK5wZCaqxsYrZ8sNkYwOv6T9j9Kh2qEMxhzQ';
  const RANGE = 'TestGS';

  useEffect(() => {
    fetchData();
      }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
      if (response.ok) {
        const jsonData = await response.json();
        const values = jsonData.values.slice(1);

        const transformedData = values.map(row => ({
          FName: row[0],
          LName: row[1],
          Email: row[2],
          Number: row[3],
        }));

        setData(transformedData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  return (
    <ImageBackground source={mild2} style={styles.fullscreenBG}>
    <ScrollView style={styles.container}>
    <View style={styles.form}>
    <Text></Text>
  <View style={styles.header}>
    <Text style={styles.headerText}>DETAILS</Text>
  </View>
    <DataTable>
    <DataTable.Header style={{color:'black'}}>
      <DataTable.Title style={styles.cellh}><Text style={styles.ht}>S No</Text></DataTable.Title>
      <DataTable.Title style={styles.cellh}><Text style={styles.ht}>First Name</Text></DataTable.Title>
      <DataTable.Title style={styles.cellh}><Text style={styles.ht}>Last Name</Text></DataTable.Title>
      <DataTable.Title style={styles.cellh}><Text style={styles.ht}>Email</Text></DataTable.Title>
      <DataTable.Title style={styles.cellh}><Text style={styles.ht}>Number</Text></DataTable.Title>
     
    </DataTable.Header>
    {data.map((row, index) => (
      <DataTable.Row key={index}>
        <DataTable.Cell style={styles.cell}><Text>{index + 1}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.cell}><Text>{row.FName}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.cell}><Text>{row.LName}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.cell}>    
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text>{row.Email}</Text>
          </ScrollView>
        </DataTable.Cell>   
        <DataTable.Cell style={styles.cell}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text>{row.Number}</Text>           
        </ScrollView>
        </DataTable.Cell>
      </DataTable.Row>    
    ))}
  </DataTable>
  </View>
  </ScrollView> 
</ImageBackground>
  );
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: 70,
         paddingHorizontal:10
        },
        header: {
          alignItems: 'center',
          marginBottom: 20,
        },
        headerText: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        cellh: {
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#ccc', 
          backgroundColor:'lightblue'
        },
        cell: {
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#ccc', 
          
        },
        ht:{
            color:'black',
            fontWeight: 'bold',
            fontSize: 13,
        },
        form:{
            backgroundColor:'white',
            borderRadius:10
        },
        fullscreenBG: {
            flex: 1,
            resizeMode: 'cover' 
          },
      });

export default GoogleSheet;