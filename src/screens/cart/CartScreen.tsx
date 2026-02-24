import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useCart } from "../../context/CartContext";
import ProductCartItemCard from "../../shared/components/ProductCartItemCard";

export default function CartScreen() {
    const { cartItems, isLoading, error, fetchCart, updateQuantity, removeItem } = useCart();

    useFocusEffect(
        useCallback(() => {
            fetchCart();
        }, [fetchCart])
    );

    const handleIncrease = async (kasbuf_id: number) => {
        const item = cartItems.find(i => i.kasbuf_id === kasbuf_id);
        if (item) await updateQuantity(kasbuf_id, item.quantity + 1);
    };

    const handleDecrease = async (kasbuf_id: number) => {
        const item = cartItems.find(i => i.kasbuf_id === kasbuf_id);
        if (item && item.quantity > 1) await updateQuantity(kasbuf_id, item.quantity - 1);
    };

    const handleRemove = async (kasbuf_id: number) => {
        await removeItem(kasbuf_id);
    };

    const handleCheckout = () => {
        Alert.alert(
            "Поръчката е изпратена! ✅",
            "Благодарим ви! Ще се свържем с вас скоро.",
            [{
                text: "OK",
                onPress: async () => {
                    for (const item of cartItems) {
                        await removeItem(item.kasbuf_id);
                    }
                },
            }]
        );
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    // Loading state
    if (isLoading && cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛒 Количка</Text>
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
                    <Text style={styles.headerTitle}>🛒 Количка</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryBtn} onPress={fetchCart}>
                        <Text style={styles.retryBtnText}>Опитай отново</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Empty state
    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛒 Количка</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.emptyEmoji}>🛒</Text>
                    <Text style={styles.emptyText}>Количката е празна</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛒 Количка</Text>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.stock_id.toString()}
                renderItem={({ item }) => (
                    <ProductCartItemCard
                        item={item}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleRemove={handleRemove}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={fetchCart} />
                }
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Общо:</Text>
                    <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} €</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                    <Text style={styles.checkoutBtnText}>Поръчай сега</Text>
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
        padding: 12,
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 16,
        color: "#555",
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    checkoutBtn: {
        backgroundColor: "#3478f6",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    checkoutBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
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
});