import * as React from "react";
import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import NumberFormat from "react-number-format";

import alpacaAPI from "../services/alpaca";

interface Props {}

interface State {
  buying_power: number;
  cash: number;
  long_market_value: number;
  portfolio_value: number;
  positions: Array<any>;
  dia_price: number;
  spy_price: number;
  qqq_price: number;
  iwm_price: number;
}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const symbols = ["DIA", "SPY", "QQQ", "IWM"];

class DashboardScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,
      positions: [],
      dia_price: 0,
      spy_price: 0,
      qqq_price: 0,
      iwm_price: 0,
    };
  }

  componentDidMount() {
    const api = alpacaAPI();
    api.getAccount().then((response: any) => {
      if (response.ok) {
        this.setState({
          buying_power: response.data.buying_power,
          cash: response.data.cash,
          long_market_value: response.data.long_market_value,
          portfolio_value: response.data.portfolio_value,
        });
      }
    });

    api.getPositions().then((response: any) => {
      console.log(response);
      if (response.ok) {
        this.setState({
          positions: response.data,
        });
      }
    });
  }

  renderRow = ({ item }) => {
    if (item.symbol in symbols) {
      if (item.symbol == "DIA")
        this.setState({ dia_price: item.current_price });
      if (item.symbol == "SPY")
        this.setState({ spy_price: item.current_price });
      if (item.symbol == "QQQ")
        this.setState({ qqq_price: item.current_price });
      if (item.symbol == "IWM")
        this.setState({ iwm_price: item.current_price });
      return <View></View>;
    }
    return (
      <View key={item.asset_id} style={styles.positions}>
        <View style={styles.positionsLeftContainer}>
          <Text>{item.symbol}</Text>
          <Text>
            {item.qty} @ {item.avg_entry_price}
          </Text>
        </View>
        <View style={styles.positionsRightContainer}>
          <Text>{item.current_price}</Text>
          <Text>{(item.change_today * 100).toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.equity}>Investing</Text>
        <NumberFormat
          value={this.state.portfolio_value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => <Text style={styles.equity}>{value}</Text>}
        />
        <View style={styles.chart}></View>
        <View>
          <View style={styles.buyingPowerContainer}>
            <Text>Buying Power</Text>
            <NumberFormat
              value={this.state.buying_power}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <Text>{value}</Text>}
            />
          </View>
          <View style={styles.buyingPowerContainer}>
            <Text>Cash</Text>
            <NumberFormat
              value={this.state.cash}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <Text>{value}</Text>}
            />
          </View>
        </View>

        <Text style={styles.header}>Market</Text>
        <View style={styles.marketContainer}>
          <View style={styles.market}>
            <Text style={styles.marketSymbol}>DIA</Text>
            <NumberFormat
              value={this.state.dia_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.marketPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.market}>
            <Text style={styles.marketSymbol}>SPY</Text>
            <NumberFormat
              value={this.state.spy_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.marketPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.market}>
            <Text style={styles.marketSymbol}>QQQ</Text>
            <NumberFormat
              value={this.state.qqq_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.marketPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.market}>
            <Text style={styles.marketSymbol}>IWM</Text>
            <NumberFormat
              value={this.state.iwm_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.marketPrice}>{value}</Text>
              )}
            />
          </View>
        </View>

        <Text style={styles.header}>Stocks</Text>
        <View>
          <FlatList
            data={this.state.positions}
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  equity: {
    fontSize: 30,
  },
  chart: {
    height: 200,
  },
  buyingPowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 30,
    marginTop: 10,
  },
  marketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  market: {
    height: 100,
    width: (screenWidth - 60) / 4,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    alignItems: "center",
    backgroundColor: "green",
  },
  marketSymbol: {
    fontSize: 30,
    color: "white",
  },
  marketPrice: {
    color: "white",
  },
  positions: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  positionsLeftContainer: {
    flex: 4,
  },
  positionsRightContainer: {
    flex: 1,
  },
});

export default DashboardScreen;
