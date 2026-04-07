import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Course = {
  _id: string;
  courseName: string;
  holes: number;
  courseRating: number;
  topScores: { userId: string; score: number; user: string }[];
};

export default function CourseInfo() {
  const { BACKEND_URL, userData } = useAuth();
  const { courseId } = useLocalSearchParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [mode, setMode] = useState<"bestBall" | "singles">("singles");
  const [totalInput, setTotalInput] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/getSingleCourse`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: courseId }),
        });

        const data = await res.json();
        setCourse(data.information);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, []);

  if (!course) return <Text style={{ padding: 20 }}>Loading...</Text>;

  const difficulty =
    course.courseRating >= 72
      ? "Hard"
      : course.courseRating >= 68
        ? "Medium"
        : "Easy";

  const topScore =
    course.topScores.length > 0
      ? Math.min(...course.topScores.map((s) => s.score))
      : null;

  const SubmitRound = async () => {
    try {
      const submitData = await fetch(`${BACKEND_URL}/auth/addScore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          courseName: course.courseName,
          score: totalInput,
          par: course.courseRating,
          userId: userData?.userId,
          firstName: userData?.firstName,
        }),
      });

      const data = await submitData.json();
      console.log(data);
      setTotalInput("0");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={{ paddingBottom: 0 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.courseName}>{course.courseName}</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{difficulty}</Text>
                </View>
              </View>
              {/* TOP SCORE */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>🏆 Course Record</Text>

                {topScore ? (
                  <Text style={styles.topScore}>{topScore}</Text>
                ) : (
                  <Text style={styles.emptyText}>
                    No scores yet — be the first 👀
                  </Text>
                )}
              </View>
              {/* TOP PLAYERS */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>👥 Top Players</Text>

                {[...course.topScores]
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 3)
                  .map((item, index) => (
                    <View key={index} style={styles.playerRow}>
                      <Text style={styles.rank}>{index + 1}</Text>
                      <Text style={styles.playerName}>{item.user}</Text>
                      <Text style={styles.playerScore}>{item.score}</Text>
                    </View>
                  ))}
              </View>
              {/* COURSE STATS */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Course Info</Text>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Holes</Text>
                  <Text style={styles.statValue}>{course.holes}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Par</Text>
                  <Text style={styles.statValue}>{course.courseRating}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Difficulty</Text>
                  <Text style={styles.statValue}>{difficulty}</Text>
                </View>
              </View>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    mode === "singles" && styles.activeToggle,
                  ]}
                  onPress={() => setMode("singles")}
                >
                  <Text style={mode === "singles" && styles.activeText}>
                    Singles
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    mode === "bestBall" && styles.activeToggle,
                  ]}
                  onPress={() => setMode("bestBall")}
                >
                  <Text style={mode === "bestBall" && styles.activeText}>
                    Best Ball
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardCenter}>
                <Text style={styles.label}>Enter Total Score</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.bigInput}
                    keyboardType="numeric"
                    placeholder="84"
                    placeholderTextColor="#bbb"
                    value={totalInput}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/[^0-9]/g, "");
                      setTotalInput(cleaned);
                    }}
                    maxLength={3}
                  />
                </View>
              </View>
              {/* CTA */}
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => SubmitRound()}
              >
                <Text style={styles.playText}>Submit Round</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f5",
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  courseName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1e7f4f",
  },

  badge: {
    marginTop: 6,
    backgroundColor: "#e8f5ee",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    color: "#1e7f4f",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  topScore: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1e7f4f",
  },

  emptyText: {
    color: "#888",
    fontStyle: "italic",
  },

  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  rank: {
    fontWeight: "700",
    width: 20,
  },

  playerName: {
    flex: 1,
    marginLeft: 10,
  },

  playerScore: {
    fontWeight: "700",
    color: "#1e7f4f",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  statLabel: {
    color: "#666",
  },

  statValue: {
    fontWeight: "700",
  },

  playButton: {
    marginTop: "auto",
    backgroundColor: "#1e7f4f",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  playText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 16,
  },

  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: "#1e7f4f",
    borderRadius: 12,
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  cardCenter: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  inputWrapper: {
    backgroundColor: "#f4f7f5",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 120,
    alignItems: "center",
  },

  bigInput: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1e7f4f",
    textAlign: "center",
  },

  label: {
    color: "#888",
    marginBottom: 10,
    fontWeight: "500",
  },
});
