import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  available: boolean;
  category: string;
  onPress: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  name,
  description,
  image,
  price,
  available,
  category,
  onPress,
  onDelete,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>
            Sin imagen
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>
            {category}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: available
                  ? '#E3EDE6'
                  : '#F5EBE6',
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: available
                    ? '#2C4A3E'
                    : '#8C6D53',
                },
              ]}
            >
              {available ? 'Disponible' : 'Agotado'}
            </Text>
          </View>
        </View>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            ${Number(price || 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Text style={styles.deleteText}>
              Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FDFBF7',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFECE6',
    elevation: 2,
    shadowColor: '#2C4A3E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F2EB',
  },

  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C7A6B',
  },

  content: {
    padding: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8C7A6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3531',
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F2EB',
    paddingTop: 12,
  },

  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C4A3E',
  },

  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F9F5F0',
  },

  deleteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A36854',
  },
});
