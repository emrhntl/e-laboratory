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
  noResultMessage?: string;
  disabled?: boolean; // Yeni disabled parametresi eklendi
}

const CustomSearchDropdown: React.FC<DropdownProps> = ({
  data,
  onSelect,
  setValue,
  placeholder = 'Select an item',
  style,
  noResultMessage,
  disabled = false // Default olarak false
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
    if (disabled) return; // Eğer disabled true ise hiçbir işlem yapılmaz
    if (isFocused) {
      setIsVisible(false);
      setIsFocused(false);
    } else {
      setIsVisible(true);
      setIsFocused(true);
    }
  }, [isFocused, disabled]);

  const handleFocus = useCallback(() => {
    if (disabled) return; // Eğer disabled true ise odaklanma işlemi yapılmaz
    if (!isFocused) {
      setIsVisible(true);
      setIsFocused(true);
    }
  }, [isFocused, disabled]);

  const handleSelect = useCallback(
    (item: DropdownItem) => {
      if (disabled) return; // Eğer disabled true ise seçim yapılmaz
      onSelect(item);
      setSearchQuery(item.label);
      if (setValue) {
        setValue(item.value);
      }
      setIsVisible(false);
      setIsFocused(false);
    },
    [onSelect, setValue, disabled]
  );

  return (
    <View style={[defaultStyles.container, style]}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          defaultStyles.inputWrapper,
          disabled && defaultStyles.disabledInputWrapper // Disabled stilini uygula
        ]}
        onPress={toggleDropdown}
        disabled={disabled} // TouchableOpacity devre dışı bırakılır
      >
        <TextInput
          style={[
            defaultStyles.searchInput,
            disabled && defaultStyles.disabledSearchInput // Disabled stilini uygula
          ]}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={handleSearch}
          editable={!disabled} // TextInput devre dışı bırakılır
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
        />
        <MaterialIcons
          name={isVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={disabled ? '#ccc' : '#888'} // İkon rengi disabled durumunda gri olur
          style={defaultStyles.icon}
        />
      </TouchableOpacity>

      {isVisible && !disabled && (
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
              <Text style={defaultStyles.noResults}>{noResultMessage}</Text>
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
