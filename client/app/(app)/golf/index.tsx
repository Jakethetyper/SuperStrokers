import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Course = {
  _id: string;
  courseName: string;
  holes: number;
  courseRating: number;
  highestScore: { userId: string; score: number };
  topScores: [{ userId: string; score: number }];
};

export default function Golf() {
  const { BACKEND_URL } = useAuth();

  const [isBottomFocused, setIsBottomFocused] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newHoles, setNewHoles] = useState("");
  const [newPar, setNewPar] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const courseData = await fetch(`${BACKEND_URL}/auth/getCourses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await courseData.json();
        setCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(search.toLowerCase()),
  );

  const addCourse = async () => {
    if (!newName || !newHoles || !newPar) return;
    try {
      const response = await fetch(`${BACKEND_URL}/auth/addCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newHoles,
          newPar,
        }),
      });
      const data = await response.json();

      const updatedCourses = [...courses, data.newCourse];
      setCourses(updatedCourses);
    } catch (error) {
      console.log(error);
    }

    setNewName("");
    setNewHoles("");
    setNewPar("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>Golf Courses</Text>

          {/* Search */}
          <TextInput
            placeholder="Search course..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />

          {/* Course List */}
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: "/golf/courseInfo",
                  params: { courseId: item._id },
                }}
                style={styles.courseCardContainer}
              >
                <View style={styles.courseCard}>
                  <View>
                    <Text style={styles.courseName}>{item.courseName}</Text>
                    <Text style={styles.courseInfo}>
                      {item.holes} holes · Par {item.courseRating}
                    </Text>
                  </View>
                  <View>
                    <MaterialIcons
                      name="arrow-right"
                      color={"black"}
                      size={36}
                    />
                  </View>
                </View>
              </Link>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No course found — add it below ⛳
              </Text>
            }
          />

          {/* ✅ ONLY this section moves with keyboard */}

          <View style={styles.addSection}>
            <Text style={styles.subtitle}>Add a Course</Text>
            <TextInput
              placeholder="Course name"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
              placeholderTextColor="#999"
              onFocus={() => setIsBottomFocused(true)}
              onBlur={() => setIsBottomFocused(false)}
            />

            <TextInput
              placeholder="Number of holes"
              value={newHoles}
              onChangeText={setNewHoles}
              keyboardType="number-pad"
              style={styles.input}
              placeholderTextColor="#999"
              onFocus={() => setIsBottomFocused(true)}
              onBlur={() => setIsBottomFocused(false)}
            />

            <TextInput
              placeholder="Course par"
              value={newPar}
              onChangeText={setNewPar}
              keyboardType="number-pad"
              style={styles.input}
              placeholderTextColor="#999"
              onFocus={() => setIsBottomFocused(true)}
              onBlur={() => setIsBottomFocused(false)}
            />

            <TouchableOpacity style={styles.addButton} onPress={addCourse}>
              <Text style={styles.addButtonText}>Add Course</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            enabled={isBottomFocused} // ✅ THIS is the key
          >
            <View style={styles.addSection}>{/* inputs */}</View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    marginBottom: 12,
    color: "#1e7f4f",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  courseCardContainer: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    backgroundColor: "#fff",
  },
  courseCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
  },
  courseInfo: {
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
  },
  addSection: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#1e7f4f",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
