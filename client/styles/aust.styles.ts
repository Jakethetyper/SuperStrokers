import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E6F2E6", // soft golf course green
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF", // white card
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Android shadow
  },

  header: {
    marginBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0B6623", // dark green for golf vibe
  },

  subtitle: {
    fontSize: 16,
    color: "#4D774E", // lighter green
    marginTop: 4,
  },

  form: {
    marginBottom: 24,
  },

  input: {
    height: 48,
    borderColor: "#BFD8B8", // soft border green
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#F6FFF6", // very soft green-white
    color: "#000",
  },

  button: {
    height: 48,
    backgroundColor: "#0B6623", // dark green
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 14,
    color: "#4D774E",
    marginRight: 4,
  },

  footerLink: {
    fontSize: 14,
    color: "#0B6623",
    fontWeight: "600",
  },
});
