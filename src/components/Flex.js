import { View } from "react-native";

// Styles
const styles = {
  // app: {
  //   flex: 4, // the number of columns you want to devide the screen into
  //   marginHorizontal: "auto",
  //   width: 400,
  //   backgroundColor: "red"
  // },
  row: {
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "row",
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  col4: {
    flex: 4,
  },
  col5: {
    flex: 5,
  },
  col6: {
    flex: 6,
  },
  col7: {
    flex: 7,
  },
  col8: {
    flex: 8,
  },
  col9: {
    flex: 9,
  },
  col10: {
    flex: 10,
  },
  col11: {
    flex: 11,
  },
  col12: {
    flex: 12,
  },
};

// RN Code
const Col = ({ numRows, style, children }) => {
  return (
    <View style={{ ...styles[`col${numRows}`], ...style }}>{children}</View>
  );
};

const Row = ({ style, children }) => {
  return <View style={{ ...styles.row, ...style }}>{children}</View>;
};

export { Col, Row };