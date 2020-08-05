import * as React from "react";
import { Text, View, FlatList, Linking, StyleSheet } from "react-native";

import alpacaAPI from "../services/alpaca";
import polygonAPI from "../services/polygon";

interface Props {}

interface Symbols {}

interface State {
  buying_power: Number;
  cash: Number;
  long_market_value: Number;
  portfolio_value: Number;
  positions: Array<any>;
  DIA: Number;
  SPY: Number;
  QQQ: Number;
  IWM: Number;
}

const testURL =
  "https://us-east4-airy-advantage-285512.cloudfunctions.net/robinhood-plus";

class DashboardScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,
      positions: [],
      DIA: 0,
      SPY: 0,
      QQQ: 0,
      IWM: 0,
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
      if (response.ok) {
        this.setState({
          positions: response.data,
        });
      }
    });

    const symbols = ["DIA", "SPY", "QQQ", "IWM"];
    const polygon = polygonAPI();

    symbols.map((symbol) => {
      polygon.getQuote(symbol).then((response: any) => {
        
        if (symbol == "DIA")
          this.setState({ DIA: response.data.ticker.lastTrade.p });
        if (symbol == "SPY")
          this.setState({ SPY: response.data.ticker.lastTrade.p });
        if (symbol == "QQQ")
          this.setState({ QQQ: response.data.ticker.lastTrade.p });
        if (symbol == "IWM")
          this.setState({ IWM: response.data.ticker.lastTrade.p });
      });
    });
  }

  renderRow = ({ item }) => {
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
        <Text style={styles.equity}>{this.state.portfolio_value}</Text>
        <View style={styles.chart}>
          <Text>Filler</Text>
        </View>
        <View>
          <View style={styles.buyingPowerContainer}>
            <Text>Buying Power</Text>
            <Text>{this.state.buying_power}</Text>
          </View>
          <Text>Cash</Text>
          <Text>{this.state.cash}</Text>
        </View>
        <View>
          <Text>DIA: {this.state.DIA}</Text>
          <Text>SPY: {this.state.SPY}</Text>
          <Text>QQQ: {this.state.QQQ}</Text>
          <Text>IWM: {this.state.IWM}</Text>
        </View>

        <View>
          <FlatList
            data={this.state.positions}
            renderItem={this.renderRow}
            keyExtractor={(item) => item.asset_id}
          ></FlatList>
        </View>

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
    marginLeft: 10,
  },
  equity: {
    fontSize: 30,
  },
  chart: {
    borderColor: "blue",
  },
  buyingPowerContainer: {
    flexDirection: "row",
  },
  positions: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
  positionsLeftContainer: {
    flex: 4,
  },
  positionsRightContainer: {
    flex: 1,
  },
});

export default DashboardScreen;
