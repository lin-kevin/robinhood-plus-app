import React from "react";
import { Text, View, Linking, Dimensions, StyleSheet } from "react-native";

const testURL =
  "https://us-east4-airy-advantage-285512.cloudfunctions.net/robinhood-plus";

const screenHeight = Math.round(Dimensions.get("window").height);

class TradeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.strategies}>
          <Text style={styles.header}>Strategies</Text>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(testURL)}
          >
            Test Python
          </Text>
          <Text>
            (insert all other strategies in FlatList with conditionally rendered
            descriptions)
            (data stored in constants/Strategies.ts)
          </Text>
        </View>

        <Text style={styles.header}>Custom </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  strategies: {
    height: screenHeight/2,
  },
  header: {
    fontSize: 30,
  },
});

export default TradeScreen;
