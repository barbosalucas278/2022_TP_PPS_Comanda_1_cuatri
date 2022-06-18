/* eslint-disable react/prop-types */
import React from 'react';
import { Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles';

export function LineChartCustom( props ) {
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

