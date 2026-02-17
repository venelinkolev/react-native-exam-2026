import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

import { HomeStackParamList } from "../../types/navigation.types";
import { useCart } from "../../context/CartContext";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route }: Props) {
    const { product } = route.params;
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        if (!product.stockID && !product.id) return;

        try {
            setIsAdding(true);
            await addToCart(product.stockID ?? product.id);
            Alert.alert(
                "Добавено! ✅",
                `„${product.name}" беше добавен в количката.`,
                [{ text: "OK" }]
            );
        } catch {
            Alert.alert("Грешка", "Неуспешно добавяне в количката.");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Product Image */}
                <View style={styles.imagePlaceholder}>
                    {product.imageUrl ? (
                        <Image
                            source={{ uri: product.imageUrl }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.imagePlaceholderText}>📦</Text>
                    )}
                </View>

                {/* Category */}
                {product.category && (
                    <Text style={styles.category}>{product.category}</Text>
                )}

                {/* Name */}
                <Text style={styles.name}>{product.name}</Text>

                {/* Price */}
                <Text style={styles.price}>{product.price.toFixed(2)} €</Text>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Description */}
                <Text style={styles.descriptionLabel}>Описание</Text>
                <Text style={styles.description}>
                    {product.description ?? "Няма налично описание за този продукт."}
                </Text>

            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.cartButton, isAdding && { opacity: 0.7 }]}
                    onPress={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.cartButtonText}>🛒 Добави в количката</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    imagePlaceholder: {
        width: "100%",
        height: 200,
        backgroundColor: "#f0f4ff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    imagePlaceholderText: {
        fontSize: 72,
    },
    productImage: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },
    category: {
        fontSize: 13,
        color: "#888",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 10,
    },
    price: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#3478f6",
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 16,
    },
    descriptionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    description: {
        fontSize: 15,
        color: "#444",
        lineHeight: 22,
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    cartButton: {
        backgroundColor: "#3478f6",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    cartButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});