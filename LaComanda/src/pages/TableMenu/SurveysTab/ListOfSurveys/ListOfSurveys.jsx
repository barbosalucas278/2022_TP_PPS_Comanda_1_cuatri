/* eslint-disable react/prop-types */
import {
  SafeAreaView, ScrollView, Text, View, Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import React Native chart Kit for different kind of Chart
import {
  BarChart,
  PieChart,
  ProgressChart
} from 'react-native-chart-kit';
import styles from './styles';
import { getAllCollection } from '../../../../services/FirestoreServices';
import { ConstantsSystem } from '../../../../config/constantsSystem';
import theme from '../../../../config/theme';
import { LineChartCustom } from '../../../../components/Charts/LineChartCustom';

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
          color: ( opacity = 1 ) => `rgba(220, 0, 0, ${opacity})`,
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
  const { dataChart, title } = props;
  return (
    <>
      <Text style={styles.charTitle}>{title}</Text>
      <BarChart
        data={dataChart}
        width={Dimensions.get( 'window' ).width - 16}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: ( opacity = 1 ) => `rgba(255, 0, 0, ${opacity})`,
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

function MyPieChart( props ) {
  const { dataChart, title } = props;
  return (
    <>
      <Text style={styles.charTitle}>{title}</Text>
      <PieChart
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
  const [barChartData, setBarChartData] = useState({
    labels: ConstantsSystem.Survey.SELECT_OPTIONS.map(( o ) => o.label ),
    datasets: [{
      data: [0, 0, 0]
    }]
  });
  const [pieChartData, setPieChartData] = useState([
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[0],
      population: 0,
      color: theme.PieChartColors[0],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[1],
      population: 0,
      color: theme.PieChartColors[1],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[2],
      population: 0,
      color: theme.PieChartColors[2],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[3],
      population: 0,
      color: theme.PieChartColors[3],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[4],
      population: 0,
      color: theme.PieChartColors[4],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: ConstantsSystem.Survey.CHECKS_OPTIONS[5],
      population: 0,
      color: theme.PieChartColors[5],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ]);
  useEffect(() => {
    getAllCollection( 'surveys', ( data ) => {
      const response = data.docs.map(( doc ) => doc.data());
      setSurveys( response );
      updateChartsData();
    }, ( error ) => console.log( error ));
  }, [surveys.length]);
  const updateChartsData = () => {
    if ( surveys.length > 0 ) {
      // Line chart config
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
      // Progress chart config
      const finishDishValues = surveys.map(( survey ) => survey.finishDish ) ?? [];
      const finishDish = [];
      ConstantsSystem.Survey.RADIO_OPTIONS.forEach(( radio ) => {
        const count = finishDishValues.filter(( value ) => value === radio ).length;
        const promedio = count / surveys.length;
        finishDish.push( promedio );
      });
      setProgressChartData({ labels: ConstantsSystem.Survey.RADIO_OPTIONS, data: finishDish });
      // Bar chart config
      const paymentMethodValues = surveys.map(( survey ) => survey.paymentMethod.value );
      const paymentMethodChart = [];
      ConstantsSystem.Survey.SELECT_OPTIONS.forEach(( check ) => {
        const count = paymentMethodValues.filter(( value ) => value === check.value ).length;
        paymentMethodChart.push( count );
      });
      setBarChartData({
        labels: ConstantsSystem.Survey.SELECT_OPTIONS.map(( o ) => o.label ),
        datasets: [{
          data: paymentMethodChart
        }]
      });
      // Pie chart config
      const whereDidYouMeetUsValues = surveys.map(( survey ) => survey.whereDidYouMeetUs );
      const whereDidYouMeetUsChart = [
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[0],
          population: 0,
          color: theme.PieChartColors[0],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[1],
          population: 0,
          color: theme.PieChartColors[1],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[2],
          population: 0,
          color: theme.PieChartColors[2],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[3],
          population: 0,
          color: theme.PieChartColors[3],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[4],
          population: 0,
          color: theme.PieChartColors[4],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: ConstantsSystem.Survey.CHECKS_OPTIONS[5],
          population: 0,
          color: theme.PieChartColors[5],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        }
      ];
      ConstantsSystem.Survey.CHECKS_OPTIONS.forEach(( check, index ) => {
        whereDidYouMeetUsValues.forEach(( userOptions ) => {
          if ( userOptions.includes( check )) {
            whereDidYouMeetUsChart[index].population += 1;
          }
        });
      });
      setPieChartData( whereDidYouMeetUsChart );
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
                <LineChartCustom dataChart={lineChartData ?? []} title='Estadía en el lugar' />
                {/* Example of Progress Chart*/}
                <MyProgressChart dataChart={progressChartData ?? []} title='Terminaron su plato' />
                {/* Example of Bar Chart*/}
                <MyBarChart dataChart={barChartData} title='¿Cómo prefieren pagar los clientes?' />
                {/* Example of Pie Chart*/}
                <MyPieChart dataChart={pieChartData} title='¿Dónde nos conocieorn los clientes?' />
              </View>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

