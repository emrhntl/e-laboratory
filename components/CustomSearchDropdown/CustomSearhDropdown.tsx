import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import defaultStyles from './CustomSearchDropdown.style';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  data: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  setValue?: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

const CustomSearchDropdown: React.FC<DropdownProps> = ({
  data,
  onSelect,
  setValue,
  placeholder = 'Select an item',
  style,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => item.label.toLowerCase().includes(lowerQuery));
  }, [searchQuery, data]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    setIsVisible(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (isFocused) {
      setIsVisible(false);
      setIsFocused(false);
    } else {
      setIsVisible(true);
      setIsFocused(true);
    }
  }, [isFocused]);

  const handleFocus = useCallback(() => {
    if (!isFocused) {
      setIsVisible(true);
      setIsFocused(true);
    }
  }, [isFocused]);

  const handleSelect = useCallback(
    (item: DropdownItem) => {
      onSelect(item);
      setSearchQuery(item.label);
      if (setValue) {
        setValue(item.value);
      }
      setIsVisible(false);
      setIsFocused(false);
    },
    [onSelect, setValue]
  );

  return (
    <View style={[defaultStyles.container, style]}>
      <TouchableOpacity
        activeOpacity={1}
        style={defaultStyles.inputWrapper}
        onPress={toggleDropdown}
      >
        <TextInput
          style={defaultStyles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={handleSearch}
          editable
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
        />
        <MaterialIcons
          name={isVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#888"
          style={defaultStyles.icon}
        />
      </TouchableOpacity>

      {isVisible && (
        <View style={defaultStyles.dropdownContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={defaultStyles.item}
                onPress={() => handleSelect(item)}
              >
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="#555"
                  style={defaultStyles.itemIcon}
                />
                <Text style={defaultStyles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={defaultStyles.noResults}>No results found</Text>
            }
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={Platform.OS === 'android'}
            style={defaultStyles.listStyle}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(CustomSearchDropdown);
