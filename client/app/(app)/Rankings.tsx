import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";

const years = [2023, 2024, 2025, 2026];

const CURRENT_PAIRINGS_2026 = [
  { team: 1, players: ["Jake", "Brandon"] },
  { team: 2, players: ["Isaac", "Everett"] },
  { team: 3, players: ["Matt M.", "Kalub"] },
  { team: 4, players: ["Larry", "Tyler"] },
  { team: 5, players: ["Braeden", "Adam"] },
  { team: 6, players: ["Alex", "Logan"] },
  { team: 7, players: ["Kevin", "Leshawn"] },
  { team: 8, players: ["Jackson", "Blaise"] },
  { team: 9, players: ["Jared", "David"] },
  { team: 10, players: ["Ben", "Matt D."] },
];

export default function Rankings() {
  const { BACKEND_URL } = useAuth();
  const [tournamentHistory, setTournamentHistory] = useState();
  const [selectedYear, setSelectedYear] = useState(2025);
  const [players, setPlayers] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const tournamentData = await fetch(`${BACKEND_URL}/auth/getHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await tournamentData.json();
        setTournamentHistory(data.tournamentHistory);
        const userData = await fetch(`${BACKEND_URL}/auth/getPlayers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const playerData = await userData.json();
        setPlayers(playerData.players);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleNavigation = (userId: string) => {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Rankings</Text>

        {/* Year Selector */}
        <View style={styles.yearRow}>
          {years?.map((year) => (
            <TouchableOpacity
              key={year}
              onPress={() => setSelectedYear(year)}
              style={[
                styles.yearButton,
                selectedYear === year && styles.yearButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.yearText,
                  selectedYear === year && styles.yearTextActive,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={players}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListHeaderComponent={
            <>
              {/* ===== CURRENT YEAR ===== */}
              {selectedYear === 2026 ? (
                <View style={styles.currentContainer}>
                  <Text style={styles.sectionTitle}>2026 Final Pairings</Text>

                  {CURRENT_PAIRINGS_2026.map((team) => (
                    <View key={team.team} style={styles.pairingRow}>
                      <View style={styles.teamBadge}>
                        <Text style={styles.teamBadgeText}>
                          TEAM {team.team}
                        </Text>
                      </View>

                      <View style={styles.pairingCard}>
                        <Text style={styles.pairingText}>
                          {team.players.join(" & ")}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.historyContainer}>
                  <Text style={styles.sectionTitle}>Tournament History</Text>

                  {tournamentHistory
                    ?.filter((item) => item.year === selectedYear)
                    ?.map((tournament, index) => (
                      <View key={index} style={styles.historyCard}>
                        <Text style={styles.historyYear}>
                          {tournament.year}
                        </Text>

                        {tournament.teams.map((team, i) => (
                          <View key={i} style={styles.teamRow}>
                            <Text style={styles.teamLabel}>{i + 1}</Text>

                            <View style={styles.teamPlayers}>
                              {team.players.map((p, idx) => (
                                <Text key={idx} style={styles.playerTag}>
                                  {typeof p.player === "object"
                                    ? p.player.name
                                    : p.player || "Unknown"}
                                </Text>
                              ))}
                            </View>

                            <Text style={styles.teamScore}>{team.score}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                </View>
              )}

              {/* Leaderboard Title */}
              <Text style={styles.sectionTitle}>Leaderboard</Text>
            </>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.playerRow}
              onPress={() => handleNavigation(item._id)}
            >
              <Text style={styles.rank}>{index + 1}</Text>

              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.userName}</Text>
                <Text style={styles.playerScore}>
                  Avg Score: {item.avgScore}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f7f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 14,
    color: "#1e7f4f",
  },
  yearRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },
  yearButtonActive: {
    backgroundColor: "#1e7f4f",
  },
  yearText: {
    fontWeight: "600",
    color: "#333",
  },
  yearTextActive: {
    color: "#fff",
  },

  currentContainer: {
    padding: 16,
  },

  pairingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  teamBadge: {
    backgroundColor: "#1ED760",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  teamBadgeText: {
    color: "#003333",
    fontWeight: "bold",
    fontSize: 12,
  },

  pairingCard: {
    flex: 1,
    backgroundColor: "#073B3A",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  pairingText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 1,
  },
  historyContainer: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1e7f4f",
  },

  historyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  historyYear: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },

  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  teamLabel: {
    fontWeight: "600",
    color: "#555",
    width: 70,
  },

  teamPlayers: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },

  playerTag: {
    backgroundColor: "#e8f5ee",
    color: "#1e7f4f",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
  },

  teamScore: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1e7f4f",
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  rank: {
    fontSize: 20,
    fontWeight: "700",
    width: 30,
    color: "#1e7f4f",
  },
  playerInfo: {
    marginLeft: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  playerScore: {
    color: "#666",
    marginTop: 4,
  },
});
