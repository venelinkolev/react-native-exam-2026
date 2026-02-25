import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";

import { HomeScreenNavigationProp } from "../../types/navigation.types";
import { ProductParam, Group } from "../../types/product.types";
import { fetchProducts, fetchGroups } from "../../api/products";
import ProductCard from "../../shared/components/ProductCard";

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
    const [products, setProducts] = useState<ProductParam[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(10);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const loadedGroups = await fetchGroups();
            const data = await fetchProducts(loadedGroups);
            setGroups(loadedGroups);
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

    const filteredProducts = products
        .filter((p) => selectedGroupId === null || p.category === groups.find((g) => g.id === selectedGroupId)?.name)
        .filter((p) => p.price <= maxPrice);

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
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛍️ Онлайн магазин</Text>
            </View>
            {/* Filter by Group */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.groupsContainer}
                contentContainerStyle={{ paddingHorizontal: 12 }}
            >
                <TouchableOpacity
                    style={[styles.groupBtn, selectedGroupId === null && styles.groupBtnActive]}
                    onPress={() => setSelectedGroupId(null)}
                >
                    <Text style={[styles.groupBtnText, selectedGroupId === null && styles.groupBtnTextActive]}>
                        Всички
                    </Text>
                </TouchableOpacity>

                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.id}
                        style={[styles.groupBtn, selectedGroupId === group.id && styles.groupBtnActive]}
                        onPress={() => setSelectedGroupId(group.id)}
                    >
                        <Text style={[styles.groupBtnText, selectedGroupId === group.id && styles.groupBtnTextActive]}>
                            {group.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Filter Products Price */}
            <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Макс. цена: {maxPrice.toFixed(2)} €</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.2}
                    value={maxPrice}
                    onValueChange={(val) => setMaxPrice(val)}
                    minimumTrackTintColor="#3478f6"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#3478f6"
                />
            </View>

            <FlatList
                data={filteredProducts}
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
    sliderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    sliderLabel: {
        fontSize: 13,
        color: "#555",
        marginBottom: 4,
        fontWeight: "600",
    },
    slider: {
        width: "70%",
        height: 26,
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
    groupsContainer: {
        minHeight: 50,
        maxHeight: 50,
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    groupBtn: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 4,
        height: 30,
    },
    groupBtnActive: {
        backgroundColor: "#3478f6",
    },
    groupBtnText: {
        fontSize: 13,
        color: "#555",
        fontWeight: "600",
    },
    groupBtnTextActive: {
        color: "#fff",
    },
});