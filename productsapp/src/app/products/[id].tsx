import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProductsStore } from '../../store/productsStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products } = useProductsStore();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Producto no encontrado</Text>
        <TouchableOpacity style={styles.backButtonSimple} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.detailsContainer}>
          <View style={styles.topRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={[styles.badge, { backgroundColor: product.available ? '#E3EDE6' : '#F5EBE6' }]}>
              <Text style={[styles.badgeText, { color: product.available ? '#2C4A3E' : '#8C6D53' }]}>
                {product.available ? 'En Stock' : 'Agotado'}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver al listado</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2EB',
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#EFECE6',
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: '#FDFBF7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    minHeight: 400,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8C7A6B',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C3531',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C4A3E',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F2EB',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F2EB',
  },
  notFoundText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FDFBF7',
    borderTopWidth: 1,
    borderTopColor: '#F5F2EB',
  },
  backButton: {
    backgroundColor: '#2C4A3E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  backButtonSimple: {
    backgroundColor: '#2C4A3E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FDFBF7',
    fontSize: 15,
    fontWeight: '600',
  },
});