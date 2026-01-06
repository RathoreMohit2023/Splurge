import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Assets/theme/color'; 

const { height, width } = Dimensions.get('window');

const SelectionModal = ({
  visible,
  onClose,
  onSelect,
  data = [],
  title = 'Select Item',
  placeholder = 'Search...',
  selectedItem = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
    setSearchQuery('');
  }, [visible, data]);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const newData = data?.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.keyboardContent}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity
            style={styles.backdropClickArea}
            activeOpacity={1}
            onPress={onClose}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <Icon name="close" size={22} color={Colors.text} />
                  </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                  <Icon
                    name="magnify"
                    size={22}
                    color={Colors.theme}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholder || '#999'}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    selectionColor={Colors.theme}
                  />
                </View>

                {/* List */}
                <FlatList
                  data={filteredData}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.listContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  // Important for List inside ScrollView
                  nestedScrollEnabled={true}
                  // Limit height of list so the modal doesn't grow too large
                  style={{ maxHeight: height * 0.4 }}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Icon
                        name="alert-circle-outline"
                        size={36}
                        color={Colors.placeholder || '#999'}
                      />
                      <Text style={styles.emptyText}>No results found</Text>
                    </View>
                  }
                  renderItem={({ item }) => {
                    const isSelected = item === selectedItem;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.item,
                          isSelected && styles.selectedItemWrapper,
                        ]}
                        onPress={() => {
                          onSelect(item);
                          onClose();
                        }}
                      >
                        <Text
                          style={[
                            styles.itemText,
                            isSelected && styles.selectedItemText,
                          ]}
                        >
                          {item}
                        </Text>

                        {isSelected ? (
                          <Icon
                            name="check-circle"
                            size={22}
                            color={Colors.theme}
                          />
                        ) : (
                          <Icon
                            name="radiobox-blank"
                            size={22}
                            color={Colors.border || '#ccc'}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  keyboardContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backdropClickArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9, 
    maxHeight: height * 0.7,
    backgroundColor: Colors.surface || '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border || '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: Colors.text || '#000',
  },
  closeBtn: {
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background || '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border || '#e0e0e0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.text || '#000',
    fontSize: 16,
    fontFamily: 'serif',
    height: '100%',
  },
  listContent: {
    paddingBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'serif',
    color: Colors.text || '#333',
  },
  selectedItemWrapper: {
    backgroundColor: 'rgba(46, 102, 221, 0.08)',
    borderRadius: 10,
    borderBottomWidth: 0,
    borderWidth: 1,
    borderColor: Colors.theme || 'blue',
  },
  selectedItemText: {
    color: Colors.theme || 'blue',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: Colors.placeholder || '#999',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'serif',
  },
});

export default SelectionModal;
