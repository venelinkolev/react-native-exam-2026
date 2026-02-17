import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";

import { HomeScreenNavigationProp } from "../../types/navigation.types";
import { ProductParam } from "../../types/product.types";
import { fetchProducts } from "../../api/products";
import ProductCard from "../../shared/components/ProductCard";

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
    const [products, setProducts] = useState<ProductParam[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch {
            setError("Грешка при зареждане на продуктите.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleProductPress = (product: ProductParam) => {
        navigation.navigate("ProductDetails", { product });
    };

    // Loading state
    if (isLoading && products.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛍️ Онлайн магазин</Text>
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3478f6" />
                </View>
            </SafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛍️ Онлайн магазин</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryBtn} onPress={loadProducts}>
                        <Text style={styles.retryBtnText}>Опитай отново</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛍️ Онлайн магазин</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={handleProductPress} />
                )}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadProducts} />
                }
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>Няма налични продукти.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    header: {
        backgroundColor: "#3478f6",
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    list: {
        paddingVertical: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 15,
        color: "#e74c3c",
        marginBottom: 16,
        textAlign: "center",
    },
    retryBtn: {
        backgroundColor: "#3478f6",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    emptyText: {
        fontSize: 15,
        color: "#888",
    },
});