import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import LogoutButton from '../_components/logoutButton'; // Import your LogoutButton component

const MoreSection = ({ navigation }) => {
  const menuItems = [
    { icon: 'person', name: 'Profile', iconSet: 'Ionicons' },
    { icon: 'settings', name: 'Settings', iconSet: 'Ionicons' },
    { icon: 'help-circle', name: 'Help & Support', iconSet: 'Ionicons' },
    { icon: 'document-text', name: 'Terms & Conditions', iconSet: 'Ionicons' },
    { icon: 'shield-checkmark', name: 'Privacy Policy', iconSet: 'Ionicons' },
    { icon: 'star', name: 'Rate Us', iconSet: 'Ionicons' },
    { icon: 'share-social', name: 'Share App', iconSet: 'Ionicons' },
    { icon: 'info', name: 'About', iconSet: 'Ionicons' },
  ];

  const renderIcon = (iconSet, iconName) => {
    switch (iconSet) {
      case 'Ionicons':
        return <Ionicons name={iconName} size={24} color="#3A86FF" />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={24} color="#3A86FF" />;
      case 'FontAwesome':
        return <FontAwesome name={iconName} size={24} color="#3A86FF" />;
      default:
        return <Ionicons name={iconName} size={24} color="#3A86FF" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>More Options</Text>
      </View>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            // Handle navigation or actions for each item
            console.log(`${item.name} pressed`);
          }}
        >
          {renderIcon(item.iconSet, item.icon)}
          <Text style={styles.menuText}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      ))}

      {/* Add the LogoutButton component */}
      <LogoutButton />

      <View style={styles.footer}>
        <Text style={styles.footerText}>App Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MoreSection;