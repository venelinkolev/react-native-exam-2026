import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/navigation.types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route, navigation }: Props) {
    const { product } = route.params;

    const handleAddToCart = () => {
        Alert.alert(
            "Добавено в количката",
            `„${product.name}" беше добавен успешно.`,
            [{ text: "OK" }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Image Placeholder */}
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>📦</Text>
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
                <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                    <Text style={styles.cartButtonText}>🛒 Добави в количката</Text>
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