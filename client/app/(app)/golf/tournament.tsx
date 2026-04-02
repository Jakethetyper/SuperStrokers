import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

type userTeam = {
  teamNumber: string;
  players: [];
  scores: [];
  total: number;
};

export default function Tournament() {
  const { tournyData, userData, BACKEND_URL } = useAuth();

  const [currentHole, setCurrentHole] = useState(1);
  const [score, setScore] = useState("");
  const [usersTeam, setUsersTeam] = useState<userTeam | null>();
  const [overallData, setOverallData] = useState(tournyData);

  useEffect(() => {
    if (!tournyData || !userData) return;

    const userTeam = tournyData.teams.find((team) =>
      team.players.includes(userData.firstName),
    );
    console.log(userTeam, "hi");
    for (let i = 0; i < userTeam?.scores.length; i++) {
      if (userTeam?.scores[i] === null) {
        let tempHole = i + 1;
        setCurrentHole(tempHole);
        setUsersTeam(userTeam);
        return;
      }
    }
  }, [tournyData, userData]);

  // Sort leaderboard (lowest score first, nulls last)
  const sortedTeams = [...(tournyData?.teams || [])].sort((a, b) => {
    return (a.parTracker || 0) - (b.parTracker || 0);
  });

  const submitScore = async () => {
    try {
      const data = await fetch(`${BACKEND_URL}/auth/submitScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          teamNumber: usersTeam?.teamNumber,
          hole: currentHole,
          year: 2026,
        }),
      });

      const response = await data.json();
      console.log(response.team);

      setScore("");
      if (currentHole < 18) {
        setCurrentHole((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.card}>
            {/* TEAM HEADER */}
            <View style={styles.teamHeader}>
              <Text style={styles.teamText}>
                {usersTeam?.players.join(" • ")}
              </Text>
            </View>

            {/* HOLE CARD */}
            <View style={styles.holeRow}>
              {/* HOLE NUMBER */}
              <View style={styles.holeBox}>
                <Text style={styles.holeLabel}>Hole</Text>
                <Text style={styles.holeNumber}>{currentHole}</Text>
              </View>

              {/* SCORE INPUT */}
              <View style={styles.scoreBox}>
                <Text style={styles.holeLabel}>Score</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={score}
                  onChangeText={(text) => setScore(text)}
                  style={styles.input}
                />
              </View>

              {/* SUBMIT */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => submitScore()}
              >
                <MaterialIcons name="arrow-forward" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Tournament Leaderboard</Text>
        <FlatList
          data={sortedTeams}
          keyExtractor={(item) => item.teamNumber.toString()}
          renderItem={({ item, index }) => {
            const isUserTeam = item.players.includes(userData.firstName);
            const thru = item.scores.filter((s) => s !== null).length;

            return (
              <View style={[styles.row, isUserTeam && styles.highlightRow]}>
                {/* POSITION */}
                <Text style={styles.position}>{index + 1}</Text>

                {/* TEAM INFO */}
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>
                    {item.players.join(" • ")}
                  </Text>
                  {thru > 0 ? (
                    <Text style={styles.players}>Thru {thru}</Text>
                  ) : (
                    <Text style={styles.players}>Not Started</Text>
                  )}
                </View>

                {/* SCORE DISPLAY */}
                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>{item.parTracker}</Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b3d2e",
    paddingTop: 16,
    paddingBottom: 16,
  },

  card: {
    backgroundColor: "#1e7f4f",
    margin: 16,
    borderRadius: 20,
    padding: 18,
  },

  teamHeader: {
    marginBottom: 16,
  },

  teamText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  holeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  holeBox: {
    alignItems: "center",
  },

  scoreBox: {
    alignItems: "center",
  },

  holeLabel: {
    color: "#d4f5e9",
    fontSize: 12,
    marginBottom: 4,
  },

  holeNumber: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    width: 70,
    height: 50,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },

  submitButton: {
    backgroundColor: "#0b3d2e",
    padding: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },

  highlightRow: {
    backgroundColor: "#d4f5e9",
    borderWidth: 2,
    borderColor: "#1e7f4f",
  },

  position: {
    fontSize: 18,
    fontWeight: "700",
    width: 30,
  },

  teamInfo: {
    flex: 1,
  },

  teamName: {
    fontWeight: "700",
  },

  players: {
    color: "#666",
    fontSize: 12,
  },

  scoreContainer: {
    alignItems: "center",
  },

  score: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e7f4f",
  },
});
