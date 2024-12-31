import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  container: {
    width: '80%',
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  icon: {
    marginLeft: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    marginTop: '3%',
  },
  listStyle: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemIcon: {
    marginRight: 8,
  },
  itemText: {
    fontSize: 14,
  },
  noResults: {
    padding: 6,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  disabledInputWrapper: {
    backgroundColor: '#f9f9f9',
    opacity: 0.6
  },
  disabledSearchInput: {
    color: '#a9a9a9'
  }
});

export default defaultStyles;
