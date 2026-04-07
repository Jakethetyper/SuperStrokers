import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { profileStyles as styles } from "@/styles/profile.styles";
import { useLocalSearchParams } from "expo-router";

type round = number;

type profileUser = {
  avgScore: number;
  firstName: string;
  lastName: string;
  userName: string;
  rounds: number;
  best: number;
  coursesPlayed: number;
  improvement: { roundsTwo: [round]; increment: number };
};

type achievement = { year: string; place: string; score: number };

type achievements = [achievement];

export default function OtherRankings() {
  const { userId: paramUserId } = useLocalSearchParams();
  const viewingUserId = paramUserId;

  const [profileUser, setProfileUser] = useState<profileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<achievements | null>();
  const [rounds, setRounds] = useState();

  const { BACKEND_URL, logout } = useAuth();

  useEffect(() => {
    if (!viewingUserId) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/getProfileStats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: viewingUserId }),
        });

        const data = await res.json();
        setProfileUser(data.userInfo);

        const getAchievements = await fetch(
          `${BACKEND_URL}/auth/getAchievements`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: viewingUserId }),
          },
        );

        const data2 = await getAchievements.json();
        setAchievements(data2.userAchievements);

        const getUserRounds = await fetch(
          `${BACKEND_URL}/auth/getUserRecents`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: viewingUserId }),
          },
        );

        const data3 = await getUserRounds.json();
        setRounds(data3.userRecents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [viewingUserId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Loading profile…
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profileUser?.firstName?.charAt(0)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.name}>{profileUser?.userName}</Text>
              <Text style={styles.smallName}>
                {profileUser?.firstName} {profileUser?.lastName}
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
                {profileUser?.avgScore ?? "--"}
              </Text>
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Improvement</Text>
              <Text style={[styles.progressValue, styles.positive]}>
                ↓ {profileUser?.improvement.increment ?? 0} strokes
              </Text>
            </View>
          </View>

          {/* Stats Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Stats</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{profileUser?.rounds ?? 0}</Text>
                <Text style={styles.statLabel}>Rounds</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {profileUser?.best ?? "--"}
                </Text>
                <Text style={styles.statLabel}>Best</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {profileUser?.coursesPlayed ?? 0}
                </Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Achievements</Text>

            {achievements?.length > 0 ? (
              achievements?.map((item, index) => {
                const isFirst = item.place === "1st";

                return (
                  <View key={index} style={styles.achievementRow}>
                    {/* Left Medal */}
                    <View style={[styles.medal, isFirst && styles.goldMedal]}>
                      <Text style={styles.medalText}>
                        {item.place === "1st"
                          ? "🥇"
                          : item.place === "2nd" || item.place === "T-2nd"
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
              })
            ) : (
              <View>
                <Text>No Top Finishes Yet</Text>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Rounds</Text>

            {rounds?.length === 0 ? (
              <Text style={styles.emptyText}>No rounds yet</Text>
            ) : (
              rounds.map((round, index) => {
                const diff = round.score - round.courseRating;

                const getTimeAgo = (date: string) => {
                  const now = new Date();
                  const played = new Date(date);
                  const hours = Math.floor(
                    (now.getTime() - played.getTime()) / (1000 * 60 * 60),
                  );

                  if (hours < 1) return "Just now";
                  if (hours < 24) return `${hours}h ago`;
                  return `${Math.floor(hours / 24)}d ago`;
                };

                return (
                  <View key={index} style={styles.roundRow}>
                    {/* LEFT */}
                    <View>
                      <Text style={styles.courseText}>{round.courseName}</Text>
                      <Text style={styles.roundSub}>
                        Par {round.courseRating} • {getTimeAgo(round.playedAt)}
                      </Text>
                    </View>

                    {/* RIGHT */}
                    <View style={styles.scoreBadge}>
                      <Text
                        style={[
                          styles.roundScore,
                          diff < 0 && styles.underPar,
                          diff > 0 && styles.overPar,
                        ]}
                      >
                        {diff === 0 ? "E" : diff > 0 ? `+${diff}` : diff}
                      </Text>

                      <Text style={styles.roundRaw}>{round.score}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
