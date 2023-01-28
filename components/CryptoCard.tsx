import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CoinDetails, CryptoCardProps } from "../types";
import { azure, turquoise, coral, blue, indigo } from "../colors/palette";

const CryptoCard = ({
  item,
  index,
  setSelectedIndex,
  bottomSheetModalRef,
}: CryptoCardProps) => {
  const showBottomSheetModal = () => {
    setSelectedIndex(index);
    bottomSheetModalRef.current?.present();
  };
  return (
    <TouchableOpacity onPress={showBottomSheetModal}>
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.leftContent }}>
          <Image source={{ uri: item.image, width: 32, height: 32 }} />
          <View style={{ marginLeft: 16 }}>
            <Text style={{ ...styles.text }}>{item.name}</Text>
            <Text style={{ ...styles.text, fontWeight: "900" }}>
              {item.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.rightContent }}>
          <Text
            style={{ ...styles.text, color: azure[900], fontWeight: "900" }}
          >
            ${item.current_price.toFixed(2)}
          </Text>
          <Text
            style={{
              ...styles.text,
              color:
                item.price_change_percentage_7d_in_currency > 0
                  ? turquoise[900]
                  : coral[900],
            }}
          >
            {item.price_change_percentage_7d_in_currency > 0 ? "+" : null}
            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCard;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // borderColor: azure[400],
    borderWidth: 1,
    backgroundColor: azure[100],
    margin: 8,
    borderRadius: 8,
    padding: 16,
    borderColor: azure[500],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // flex: 1,
  },
  text: {
    color: azure[900],
  },
  leftContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContent: {
    alignItems: "flex-end",
  },
});
