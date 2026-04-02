import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getDecodedToken, TokenPayload } from "@/services/token.service";
import { useAuth } from "@/context/AuthContext";
import { profileStyles as styles } from "@/styles/profile.styles";

type UserStats = {
  avgScore: number;
  improvement: number;
  roundsPlayed: number;
  bestScore: number;
  coursesPlayed: number;
};

type achievements = [{ year: string; place: string; score: number }];

export default function Profile() {
  const [token, setToken] = useState<TokenPayload | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState();

  const { BACKEND_URL, logout } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const decoded = await getDecodedToken();
        setToken(decoded);

        const res = await fetch(`${BACKEND_URL}/auth/getProfileStats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: decoded?.userId }),
        });

        const data = await res.json();
        setUserStats(data);

        const getAchievements = await fetch(
          `${BACKEND_URL}/auth/getAchievements`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: decoded?.userId }),
          },
        );

        const data2 = await getAchievements.json();

        setAchievements(data2.userAchievements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Loading profile…
        </Text>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{token?.firstName?.charAt(0)}</Text>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>{token?.userName}</Text>
            <Text style={styles.smallName}>
              {token?.firstName} {token?.lastName}
            </Text>
          </View>
          <Text style={styles.subtitle}>Golfer</Text>
        </View>

        {/* Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Golf Progress</Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Average Score</Text>
            <Text style={styles.progressValue}>
              {userStats?.avgScore ?? "--"}
            </Text>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Improvement</Text>
            <Text style={[styles.progressValue, styles.positive]}>
              ↓ {userStats?.improvement ?? 0} strokes
            </Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stats</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {userStats?.roundsPlayed ?? 0}
              </Text>
              <Text style={styles.statLabel}>Rounds</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {userStats?.bestScore ?? "--"}
              </Text>
              <Text style={styles.statLabel}>Best</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {userStats?.coursesPlayed ?? 0}
              </Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>

          {achievements?.map((item, index) => {
            const isFirst = item.place === "1st";

            return (
              <View key={index} style={styles.achievementRow}>
                {/* Left Medal */}
                <View style={[styles.medal, isFirst && styles.goldMedal]}>
                  <Text style={styles.medalText}>
                    {item.place === "1st"
                      ? "🥇"
                      : item.place === "2nd"
                        ? "🥈"
                        : item.place === "3rd"
                          ? "🥉"
                          : "🏅"}
                  </Text>
                </View>

                {/* Middle Info */}
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementYear}>{item.year}</Text>
                  <Text style={styles.achievementPlace}>
                    {item.place} Place
                  </Text>
                </View>

                {/* Right Score */}
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>{item.score}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
