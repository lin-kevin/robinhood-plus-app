import React from "react";
import { Text, View, Linking, StyleSheet} from "react-native";

const testURL =
  "https://us-east4-airy-advantage-285512.cloudfunctions.net/robinhood-plus";

class TradeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(testURL)}
        >
          Test Python
        </Text>
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
});


export default TradeScreen;
