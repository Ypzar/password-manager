import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 20,
  },
  gradientContainer: {
    flex: 1,
  },
  content: {
    margin: 15,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    color: "#fff",
  },
  titleIcon: {
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    color: "#ccc",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#181D27",
  },
  noData: {
    fontSize: 17,
    fontStyle: "italic",
    marginBottom: 20,
    color: "#eee",
  },
  table: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    backgroundColor: "transparent",
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // shadowColor: "#fff",
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 1,
    // elevation: 4,
  },
  passwordItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    padding: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  listLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ddd",
    fontSize: 19,
  },
  listValue: {
    flex: 1,
    fontSize: 18,
    color: "#222",
    paddingLeft: 10,
  },
  copyIcon: {
    marginRight: 10,
    paddingLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#690500",
    borderRadius: 4,
    padding: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#008DD5",
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#181D27",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4,
  },
  submitButton: {
    backgroundColor: "#3A7D44",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 15,
    shadowOpacity: 1,
    elevation: 4,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
