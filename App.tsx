import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
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

const App = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const [coinsDetails, setCoinsDetails] = useState<CoinDetails[]>([]);

  useEffect(() => {
    getCryptoMarketData().then((data) => setCoinsDetails(data));
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlashList
          data={coinsDetails}
          renderItem={({ item }) => <CryptoCard item={item} />}
          // keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          // contentContainerStyle={{ backgroundColor: "yellow" }}
          // numColumns={2}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
