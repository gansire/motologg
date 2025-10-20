import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
 loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1000,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});