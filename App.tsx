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

const App = () => {
  const { width: SIZE } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
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
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 32} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              // padding: 16,
              borderRadius: 16,
            }}
          />
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
    padding: 16,
  },
  cryptoDetailsHeader: {
    // backgroundColor: azure[300],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoDetailsChart: {},
  cryptoDetailsDescription: {},
  cryptoDetailsText: {
    color: azure[900],
  },
});

export default App;
