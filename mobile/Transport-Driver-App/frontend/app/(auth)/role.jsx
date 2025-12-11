// app/role.js
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function RoleScreen() {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RideOn</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>
      </View>
      
      <View style={styles.roleContainer}>
        <Link href={{ pathname: "/signup", params: { role: "driver" } }} asChild>
          <TouchableOpacity style={styles.roleCard}>
            <Text style={styles.roleTitle}>Driver</Text>
            <Text style={styles.roleDescription}>
             Add Drivers
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: "/signup", params: { role: "conductor" } }} asChild>
          <TouchableOpacity style={styles.roleCard}>
            <Text style={styles.roleTitle}>Conductor</Text>
            <Text style={styles.roleDescription}>
              Add Conductor
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already registered?</Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Login to your account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e09deff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
  },
  roleContainer: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#636e72',
  },
  loginLink: {
    color: '#3498db',
    fontWeight: '600',
    marginTop: 4,
  },
};