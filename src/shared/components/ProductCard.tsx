import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { ProductParam } from "../../types/product.types";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

type Props = {
    product: ProductParam;
    onPress: (product: ProductParam) => void;
};

export default function ProductCard({ product, onPress }: Props) {
    const { addToCart } = useCart();
    const { isGuest } = useAuth();
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
        <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
            <View style={styles.imagePlaceholder}>
                {product.imageUrl ? (
                    <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <Text style={styles.imagePlaceholderText}>📦</Text>
                )}
            </View>
            <View style={styles.info}>
                <View style={styles.infoContent}>
                    <View>
                        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                        {product.category && (
                            <Text style={styles.category}>{product.category}</Text>
                        )}
                        <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
                    </View>
                    <View style={styles.cart}>
                        {isGuest ? (
                            <Text style={{ color: "#888", textAlign: "center" }}></Text>)
                            : (
                                <TouchableOpacity
                                    style={[isAdding && { opacity: 0.7 }]}
                                    onPress={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    {isAdding ? (
                                        <ActivityIndicator color="#3478f6" />
                                    ) : (
                                        <Text style={styles.cartIcon}>🛒</Text>
                                    )}
                                </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    imagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: "#f0f4ff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    imagePlaceholderText: {
        fontSize: 32,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        position: "absolute",
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    infoContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cart: {
        marginRight: 20,
    },
    cartIcon: {
        fontSize: 28,
    },
    name: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    category: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#3478f6",
    },
});