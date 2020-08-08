import * as React from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import NumberFormat from "react-number-format";

import alpacaAPI from "../services/alpaca";
import polygonAPI from "../services/polygon";

interface Props {}

interface Symbols {}

interface State {
  buying_power: number;
  cash: number;
  long_market_value: number;
  portfolio_value: number;
  positions: Array<any>;
  DIA: number;
  SPY: number;
  QQQ: number;
  IWM: number;
}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

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
        <View style={styles.featuredContainer}>
          <View style={styles.featured}>
            <Text style={styles.featuredSymbol}>DIA</Text>
            <NumberFormat
              value={this.state.DIA}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.featuredPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.featured}>
            <Text style={styles.featuredSymbol}>SPY</Text>
            <NumberFormat
              value={this.state.SPY}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.featuredPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.featured}>
            <Text style={styles.featuredSymbol}>QQQ</Text>
            <NumberFormat
              value={this.state.QQQ}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.featuredPrice}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.featured}>
            <Text style={styles.featuredSymbol}>IWM</Text>
            <NumberFormat
              value={this.state.IWM}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text style={styles.featuredPrice}>{value}</Text>
              )}
            />
          </View>
        </View>

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
  },
  featuredContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featured: {
    height: 100,
    width: (screenWidth - 60) / 4,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    alignItems: "center",
    backgroundColor: "green",
  },
  featuredSymbol: {
    fontSize: 30,
    color: "white",
  },
  featuredPrice: {
    color: "white",
  },
  positions: {
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
