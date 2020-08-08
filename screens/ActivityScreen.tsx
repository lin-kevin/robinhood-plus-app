import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

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

  render() {
    return (
      <View style={styles.container}>
        {this.state.activities.map((activity) => (
          <View style={styles.elementContainer}>
            <Text>{activity.symbol}</Text>
            <Text>
              {activity.side} {activity.qty} @ {activity.price}
            </Text>
            <Text>{activity.transaction_time}</Text>
          </View>
        ))}
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
  elementContainer: {
    width: screenWidth,
  },
});

export default ActivityScreen;
