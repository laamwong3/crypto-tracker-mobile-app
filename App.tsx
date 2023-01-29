import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { CoinDetails } from "./types";
import { getCryptoMarketData } from "./services/services";
import CryptoCard from "./components/CryptoCard";
import { azure } from "./colors/palette";
import { StatusBar } from "expo-status-bar";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  VictoryChart,
  VictoryClipContainer,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

const App = () => {
  const { width: SIZE } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["52.5%"], []);
  const [coinsDetails, setCoinsDetails] = useState<CoinDetails[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getCryptoMarketData().then((data) => setCoinsDetails(data));
  }, []);

  const HeaderText = () => (
    <View style={{ ...styles.headerTextContainer }}>
      <Text style={{ ...styles.headerText }}>Market</Text>
      <View style={{ ...styles.divider }} />
    </View>
  );

  const CryptoDetails = () => {
    const selectedCoin = coinsDetails[selectedIndex];

    let priceData = selectedCoin.sparkline_in_7d.price.map((price, index) => ({
      x: index,
      y: price,
    }));

    return (
      <View style={{ ...styles.cryptoDetailsContainer }}>
        <View style={{ ...styles.cryptoDetailsHeader }}>
          <Text style={{ ...styles.cryptoDetailsText, fontSize: 16 }}>
            {selectedCoin.name}
          </Text>
          <Text
            style={{
              ...styles.cryptoDetailsText,
              fontSize: 24,
              fontWeight: "900",
            }}
          >
            ${selectedCoin.current_price.toFixed(2)}
          </Text>
        </View>

        <View style={{ ...styles.cryptoDetailsChart }}>
          <Text
            style={{
              ...styles.cryptoDetailsText,
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {selectedCoin.name} Trends
          </Text>
          <VictoryChart
            animate={{ duration: 2000, easing: "expInOut" }}
            theme={{
              axis: {
                style: {
                  tickLabels: { fill: azure[200], padding: 8 },
                  grid: { stroke: "transparent" },
                  axis: { stroke: azure[500] },
                },
              },
            }}
            width={SIZE - 32}
            style={{
              parent: {
                backgroundColor: azure[700],
                borderRadius: 20,
              },
            }}
          >
            <VictoryLine
              interpolation={"natural"}
              style={{
                data: { stroke: azure[50] },
              }}
              data={priceData}
            />
          </VictoryChart>
        </View>
      </View>
    );
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlashList
          data={coinsDetails}
          renderItem={({ item, index }) => (
            <CryptoCard
              item={item}
              index={index}
              setSelectedIndex={setSelectedIndex}
              bottomSheetModalRef={bottomSheetModalRef}
              key={index}
            />
          )}
          // keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          ListHeaderComponent={HeaderText}
          // contentContainerStyle={{ backgroundColor: "yellow" }}
          // numColumns={2}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: azure[100],
            borderRadius: 32,
          }}
        >
          <CryptoDetails />
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: azure[50],
  },
  headerTextContainer: {
    padding: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "600",
  },
  divider: {
    backgroundColor: azure[800],
    height: 1,
    marginTop: 8,
  },
  cryptoDetailsContainer: {
    flex: 1,
    // paddingBottom: 24,
    padding: 16,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  cryptoDetailsHeader: {
    // backgroundColor: azure[300],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoDetailsChart: {
    // marginTop: 32,
  },
  cryptoDetailsDescription: {
    marginTop: 32,
  },
  cryptoDetailsText: {
    color: azure[900],
  },
});

export default App;
