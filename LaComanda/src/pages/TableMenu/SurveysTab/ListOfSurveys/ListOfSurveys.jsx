/* eslint-disable react/prop-types */
import {
  SafeAreaView, ScrollView, Text, View, Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import React Native chart Kit for different kind of Chart
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart
} from 'react-native-chart-kit';
import styles from './styles';
import { getAllCollection } from '../../../../services/FirestoreServices';
import { ConstantsSystem } from '../../../../config/constantsSystem';

function MyLineChart( props ) {
  const { dataChart, title } = props;
  return (
    <>
      <Text style={styles.charTitle}>{title}</Text>
      <LineChart
        data={dataChart}
        width={Dimensions.get( 'window' ).width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: ( opacity = 1 ) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </>
  );
}

function MyProgressChart( props ) {
  const { dataChart, title } = props;
  return (
    <>
      <Text style={styles.charTitle}>{title}</Text>
      <ProgressChart
        data={dataChart}
        width={Dimensions.get( 'window' ).width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: ( opacity = 1 ) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </>
  );
}

function MyBarChart( props ) {
  const { dataChart } = props;
  return (
    <>
      <Text style={styles.header}>Bar Chart</Text>
      <BarChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43]
            }
          ]
        }}
        width={Dimensions.get( 'window' ).width - 16}
        height={220}
        yAxisLabel='Rs'
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: ( opacity = 1 ) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </>
  );
}

function MyPieChart() {
  return (
    <>
      <Text style={styles.header}>Pie Chart</Text>
      <PieChart
        data={[
          {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'New York',
            population: 8538000,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }
        ]}
        width={Dimensions.get( 'window' ).width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: ( opacity = 1 ) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        accessor='population'
        backgroundColor='transparent'
        paddingLeft='15'
        absolute // for the absolute number remove if you want percentage
      />
    </>
  );
}
export default function ListOfSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [lineChartData, setLineChartData] = useState({
    labels: ConstantsSystem.Survey.RANGE_OPTIONS,
    datasets: [{
      data: [0, 0, 0, 0, 0],
      strokedWidth: 2
    }]
  });
  const [progressChartData, setProgressChartData] = useState({ labels: ConstantsSystem.Survey.RADIO_OPTIONS, data: [0, 0, 0] });
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  useEffect(() => {
    getAllCollection( 'surveys', ( data ) => {
      const response = data.docs.map(( doc ) => doc.data());
      setTimeout(() => {
        setSurveys( response );
        updateChartsData();
      }, 3000 );
    }, ( error ) => console.log( error ));
  }, []);
  const updateChartsData = () => {
    if ( surveys.length > 0 ) {
      const stayInThePlaceValues = surveys.map(( survey ) => survey.stayInThePlace ) ?? [];
      const stayInThePlaceChart = [];
      ConstantsSystem.Survey.RANGE_OPTIONS.forEach(( range, index ) => {
        const count = stayInThePlaceValues.filter(( value ) => value === index ).length;
        stayInThePlaceChart.push( count );
      });
      setLineChartData({
        labels: ConstantsSystem.Survey.RANGE_OPTIONS,
        datasets: [{
          data: stayInThePlaceChart,
          strokedWidth: 2
        }]
      });

      const finishDishValues = surveys.map(( survey ) => survey.finishDish ) ?? [];
      const finishDish = [];
      ConstantsSystem.Survey.RADIO_OPTIONS.forEach(( radio ) => {
        const count = finishDishValues.filter(( value ) => value === radio ).length;
        const promedio = count / surveys.length;
        finishDish.push( promedio );
      });
      setProgressChartData( finishDish );
      setBarChartData( surveys.map(( survey ) => survey ));
      setPieChartData( surveys.map(( survey ) => survey ));
    }
  };
  return (
    <SafeAreaView style={{ }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Resultados de las Encuestas</Text>
          {
            surveys.length > 0
            && (
              <View>
                {/* Example of LineChart*/}
                <MyLineChart dataChart={lineChartData ?? []} title='Estadía en el lugar' />
                {/* Example of Progress Chart*/}
                <MyProgressChart dataChart={progressChartData ?? []} title='Terminaron su plato' />
                {/* Example of Bar Chart*/}
                <MyBarChart dataChart={barChartData} />
                {/* Example of Pie Chart*/}
                <MyPieChart data={pieChartData} />
              </View>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

