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
    backgroundColor: "#073B3A",
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
});
