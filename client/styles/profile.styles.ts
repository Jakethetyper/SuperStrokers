import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f7f5",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1e7f4f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  smallName: {
    fontSize: 18,
    fontWeight: 500,
  },
  subtitle: {
    color: "#666",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
  },

  medal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  goldMedal: {
    backgroundColor: "#FFD700",
  },

  medalText: {
    fontSize: 18,
  },

  achievementInfo: {
    flex: 1,
  },

  achievementYear: {
    fontSize: 16,
    fontWeight: "600",
  },

  achievementPlace: {
    fontSize: 13,
    color: "#666",
  },

  scoreBadge: {
    backgroundColor: "#9cafaf",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  scoreText: {
    color: "#fff",
    fontWeight: "bold",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    color: "#666",
  },
  progressValue: {
    fontWeight: "600",
  },
  positive: {
    color: "#1e7f4f",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
  },
  achievementTitle: {
    fontWeight: "600",
  },
  achievementDetail: {
    color: "#666",
    marginTop: 2,
  },
  roundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  courseText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e7f4f",
  },

  roundSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },

  roundScore: {
    fontSize: 18,
    fontWeight: "800",
  },

  roundRaw: {
    fontSize: 12,
    color: "#666",
  },

  emptyText: {
    color: "#777",
    marginTop: 8,
  },

  underPar: {
    color: "#1e7f4f", // green
  },

  overPar: {
    color: "#d9534f", // red
  },
});
