import * as React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import NumberFormat from "react-number-format";

import alpacaAPI from "../services/alpaca";

interface Props {}

interface State {
  activities: Array<any>;
}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class ActivityScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    const api = alpacaAPI();
    api.getActivities().then((response: any) => {
      if (response.ok) {
        this.setState({
          activities: response.data,
        });
      }
    });
  }

  renderRow = ({ item }) => {
    var side = item.side.toUpperCase()
    var transaction_date = item.transaction_time.substr(0, 10);
    var transaction_time = item.transaction_time.substr(12, 7);
    return (
      <View style={styles.element}>
        <View style={styles.elementLeftContainer}>
          <Text style={styles.elementSymbol}>{item.symbol}</Text>
          <View style={styles.elementBottomContainer}>
            <Text>{side} {item.qty} shares at </Text>
            <NumberFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <Text>{value}</Text>}
            />
          </View>
        </View>
        <View style={styles.elementRightContainer}>
          <Text>{transaction_date}</Text>
          <Text>{transaction_time}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Recent History</Text>
        <View>
          <FlatList
            data={this.state.activities}
            renderItem={this.renderRow}
            keyExtractor={(item) => item.asset_id}
          ></FlatList>
        </View>
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
  header: {
    fontSize: 30,
    marginTop: 10,
  },
  element: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  elementSymbol: {
    fontWeight: "700",
  },
  elementLeftContainer: {
    flex: 3,
  },
  elementBottomContainer: {
    flexDirection: "row",
  },
  elementRightContainer: {
    flex: 1,
    backgroundColor: "rgb(230, 230, 230)",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ActivityScreen;
