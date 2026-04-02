import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { tournyData, userData } = useAuth();

  const [timeLeft, setTimeLeft] = useState("");

  const tournamentDate = new Date("2026-05-23T08:00:00-05:00"); // CST

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = tournamentDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Tournament is LIVE ⛳");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      setTimeLeft(`${days}d ${hours}h`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const userTeam = tournyData?.teams.find((team) =>
    team.players.includes(userData?.firstName),
  );

  const isLive = new Date() >= tournamentDate;

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0b3d2e" />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HERO */}
        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/golf1.jpeg")}
            style={styles.heroImage}
          />

          <View style={styles.overlay}>
            <Text style={styles.heroTitle}>SuperStrokers</Text>
            <Text style={styles.heroSubtitle}>Annual Tournament</Text>
          </View>
        </View>

        {/* GREETING */}

        <View style={styles.tournamentCard}>
          {/* TEAM + STATUS */}
          <View style={styles.tournamentHeader}>
            <Text style={styles.teamText}>
              {userTeam?.players[0]} • {userTeam?.players[1]}
            </Text>

            <Text style={styles.statusText}>
              {isLive ? "LIVE" : "Starts May 23 • 8:00 AM"}
            </Text>
          </View>

          {/* COUNTDOWN / LIVE */}
          <Text style={styles.countdownBig}>
            {isLive ? "Tournament Live ⛳" : timeLeft}
          </Text>

          {/* CTA BUTTON */}
          <TouchableOpacity
            disabled={isLive}
            style={[styles.tournamentButton, !isLive && styles.buttonDisabled]}
            onPress={() => {
              if (!isLive) {
                router.push("/golf/tournament");
              }
            }}
          >
            <Text style={styles.buttonText}>
              {isLive ? "Start Tournament" : "Locked"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* PAIRINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2026 Pairings</Text>

          {tournyData?.teams.map((team) => {
            const isUserTeam = team.players.includes(userData?.firstName);

            return (
              <View
                key={team.teamNumber}
                style={[styles.teamCard, isUserTeam && styles.highlightTeam]}
              >
                <Text style={styles.teamNumber}>Team {team.teamNumber}</Text>

                <View style={styles.playersRow}>
                  <Text style={styles.player}>{team.players[0]}</Text>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.player}>{team.players[1]}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            20 friends. One tournament. Every year it gets more competitive.
            Track your scores, compete with your team, and climb the
            leaderboard.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
