import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProductsStore } from '../../store/productsStore';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen() {
  const router = useRouter();

  const {
    products,
    selectedCategory,
    setSelectedCategory,
    deleteProduct,
  } = useProductsStore();

  const categories = [
    'Todos',
    'Skincare',
    'Cuidado Corporal',
    'Hogar',
  ];

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          COLECCIÓN ESENCIAL
        </Text>

        <Text style={styles.headerTitle}>
          Nuestros Productos
        </Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollCategories}
        >
          {categories.map((category) => {
            const isSelected =
              selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onPress={() =>
              router.push(`/products/${item.id}`)
            }
            onDelete={() =>
              deleteProduct(item.id)
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No hay productos
            </Text>

            <Text style={styles.emptyText}>
              No encontramos productos en esta categoría.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2EB',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },

  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8C7A6B',
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2C3531',
  },

  categoriesContainer: {
    marginBottom: 16,
  },

  scrollCategories: {
    paddingHorizontal: 20,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFECE6',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E3DFD5',
  },

  categoryChipSelected: {
    backgroundColor: '#2C4A3E',
    borderColor: '#2C4A3E',
  },

  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B5E51',
  },

  categoryTextSelected: {
    color: '#FDFBF7',
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3531',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#8C7A6B',
    textAlign: 'center',
    lineHeight: 20,
  },
});
