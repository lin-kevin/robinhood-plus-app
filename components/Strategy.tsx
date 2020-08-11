import * as React from "react";
import { View, Text, Linking, StyleSheet, Dimensions } from "react-native";

interface Props {
  id: number;
  strategy: any;
  selected: number;
}

interface State {
  selected: number;
}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class Strategy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: 1,
    };
  }

  render() {
    var text = null;
    if (this.state.selected == this.props.strategy.id)
      text = (
        <View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {this.props.strategy.description}
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <Text
              style={styles.footer}
              onPress={() => Linking.openURL(this.props.strategy.linkURL)}
            >
              Execute Trade
            </Text>
          </View>
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            onPress={() =>
              this.setState({
                selected: this.props.strategy.id,
              })
            }
          >
            {this.props.strategy.title}
          </Text>
        </View>
        {text}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  titleContainer: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    color: "white",
  },
  descriptionContainer: {
    marginTop: 10,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  description: {
    color: "grey",
  },
  footer: {
    color: "white",
  },
  footerContainer: {
    backgroundColor: "blue",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    alignItems: "center",
  },
});

export default Strategy;
