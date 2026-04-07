import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b3d2e",
  },

  scroll: {
    paddingBottom: 20,
  },

  heroContainer: {
    position: "relative",
    marginBottom: 20,
  },

  heroImage: {
    width: "100%",
    height: 220,
  },

  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
  },

  heroSubtitle: {
    color: "#d4f5e9",
  },

  tournamentCard: {
    backgroundColor: "#1e7f4f",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  teamText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  statusText: {
    color: "#d4f5e9",
    fontSize: 12,
  },

  countdownBig: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 16,
  },

  tournamentButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#cccccc",
  },

  buttonText: {
    fontWeight: "700",
    color: "#1e7f4f",
  },

  section: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1e7f4f",
  },

  teamCard: {
    backgroundColor: "#f4f7f5",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },

  highlightTeam: {
    backgroundColor: "#d4f5e9",
    borderWidth: 2,
    borderColor: "#1e7f4f",
  },

  teamNumber: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  playersRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  player: {
    fontSize: 16,
    fontWeight: "600",
  },

  separator: {
    marginHorizontal: 6,
    color: "#888",
  },

  sectionText: {
    color: "#333",
    lineHeight: 22,
  },
  recentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  recentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e7f4f",
  },

  recentSub: {
    color: "#666",
    marginTop: 4,
    fontSize: 12,
  },

  scoreBadge: {
    alignItems: "flex-end",
  },

  recentScore: {
    fontSize: 20,
    fontWeight: "800",
  },

  recentRawScore: {
    fontSize: 12,
    color: "#666",
  },

  underPar: {
    color: "#1e7f4f", // green
  },

  overPar: {
    color: "#d9534f", // red
  },

  emptyText: {
    color: "#777",
    marginTop: 8,
  },
});
