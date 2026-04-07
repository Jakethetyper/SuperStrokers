import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

import { styles } from "../../styles/home.styles";

export default function Home() {
  const { tournyData, userData, BACKEND_URL } = useAuth();

  const [timeLeft, setTimeLeft] = useState("");
  const [recents, setRecents] = useState();

  const tournamentDate = new Date("2026-05-23T08:00:00-05:00"); // CST

  useEffect(() => {
    const getDataFunction = async () => {
      try {
        const getRecents = await fetch(`${BACKEND_URL}/auth/getRecentScores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await getRecents.json();
        console.log(data.scores);

        setRecents(data.scores);
      } catch (error) {
        console.log(error);
      }
    };

    getDataFunction();

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

        {/* RECENT ROUNDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rounds</Text>

          {recents?.length === 0 ? (
            <Text style={styles.emptyText}>No recent rounds yet</Text>
          ) : (
            recents?.map((round, index) => {
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
                <View key={index} style={styles.recentCard}>
                  {/* LEFT */}
                  <View>
                    <Text style={styles.recentName}>{round.firstName}</Text>

                    <Text style={styles.courseNameSmall}>
                      {round.courseName}
                    </Text>

                    <Text style={styles.recentSub}>
                      Par {round.courseRating} • {getTimeAgo(round.playedAt)}
                    </Text>
                  </View>

                  {/* RIGHT */}
                  <View style={styles.scoreBadge}>
                    <Text
                      style={[
                        styles.recentScore,
                        round.score - round.courseRating < 0 && styles.underPar,
                        round.score - round.courseRating > 0 && styles.overPar,
                      ]}
                    >
                      {round.score - round.courseRating === 0
                        ? "E"
                        : round.score - round.courseRating > 0
                          ? `+${round.score - round.courseRating}`
                          : round.score - round.courseRating}
                    </Text>

                    <Text style={styles.recentRawScore}>{round.score}</Text>
                  </View>
                </View>
              );
            })
          )}
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
