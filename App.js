import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const initialStudents = [
  { id: 's1', name: 'Ana Cruz', year: '3rd Year', photoUrl: 'https://i.pravatar.cc/100?img=1' },
  { id: 's2', name: 'Bea Santos', year: '2nd Year', photoUrl: 'https://i.pravatar.cc/100?img=2' },
  { id: 's3', name: 'Cid Ramos', year: '4th Year', photoUrl: 'https://i.pravatar.cc/100?img=3' },
  { id: 's4', name: 'Dex Alonzo', year: '1st Year', photoUrl: 'https://i.pravatar.cc/100?img=4' },
  { id: 's5', name: 'Eli Tan', year: '3rd Year', photoUrl: 'https://i.pravatar.cc/100?img=5' },
];

export function StudentCard({ id, name, year, photoUrl, flagged, onToggleFlag }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: photoUrl }} style={styles.photo} />
      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: flagged }}
        accessibilityLabel={`${flagged ? 'Unflag' : 'Flag'} ${name} for advising`}
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.flagButton,
          flagged && styles.flagButtonSelected,
          pressed && styles.flagButtonPressed,
        ]}
      >
        <Text style={[styles.flagButtonText, flagged && styles.flagButtonTextSelected]}>
          {flagged ? 'Flagged' : 'Flag for Advising'}
        </Text>
      </Pressable>
    </View>
  );
}

export function StudentDirectory() {
  const [students, setStudents] = useState(
    initialStudents.map((student) => ({ ...student, flagged: false }))
  );
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(normalizedQuery)
  );

  function toggleFlag(studentId) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId ? { ...student, flagged: !student.flagged } : student
      )
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.eyebrow}>IT313 · ACADEMIC ADVISING</Text>
      <Text style={styles.title}>Student Directory</Text>
      <Text style={styles.subtitle}>Find a student and keep track of advising follow-ups.</Text>

      <TextInput
        accessibilityLabel="Search students by name"
        placeholder="Search students"
        placeholderTextColor="#7C8798"
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              id={student.id}
              name={student.name}
              year={student.year}
              photoUrl={student.photoUrl}
              flagged={student.flagged}
              onToggleFlag={toggleFlag}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No students found</Text>
            <Text style={styles.emptyMessage}>Try searching for another name.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return <StudentDirectory />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  eyebrow: {
    color: '#3567A8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    color: '#17283F',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#637187',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE4EF',
    borderRadius: 12,
    borderWidth: 1,
    color: '#17283F',
    fontSize: 16,
    height: 50,
    marginTop: 22,
    paddingHorizontal: 15,
  },
  list: {
    flex: 1,
    marginTop: 18,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5EAF1',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    minHeight: 94,
    padding: 12,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#E6ECF4',
  },
  studentDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  studentName: {
    color: '#17283F',
    fontSize: 15,
    fontWeight: '700',
  },
  studentYear: {
    color: '#708096',
    fontSize: 13,
    marginTop: 5,
  },
  flagButton: {
    alignItems: 'center',
    backgroundColor: '#EFF5FC',
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 10,
  },
  flagButtonSelected: {
    backgroundColor: '#2F6FB7',
  },
  flagButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
  flagButtonText: {
    color: '#2F6FB7',
    fontSize: 11,
    fontWeight: '700',
  },
  flagButtonTextSelected: {
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  emptyTitle: {
    color: '#17283F',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyMessage: {
    color: '#708096',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});
