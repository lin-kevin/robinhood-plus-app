import * as React from "react";
import { View, Text, Linking, StyleSheet, Dimensions } from "react-native";

interface Props {
  id: number;
  strategy: any;
  selected: number;
}

interface State {}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class Strategy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activities: [],
    };
  }

  render() {
    var text = null;
    if (this.props.selected == this.props.strategy.id)
      text = <Text>{this.props.strategy.description}</Text>;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.strategy.title}</Text>
        {text}
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(this.props.strategy.linkURL)}
        >
          {this.props.strategy.linkText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    fontWeight: "700",
  },
});

export default Strategy;
