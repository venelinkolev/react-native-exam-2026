import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { CartItemAPI } from "../../types/cart.types";

import ProductCartItemCard from "../../shared/components/ProductCartItemCard";

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItemAPI[]>([]);

    const handleIncrease = (id: number) => {
        setCartItems(prev =>
            prev.map(item => item.stockID === id ? { ...item, quantity: item.quantity + 1 } : item)
        );
    };

    const handleDecrease = (id: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.stockID === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCartItems(prev => prev.filter(item => item.stockID !== id));
    };

    const handleCheckout = () => {
        Alert.alert(
            "Поръчката е изпратена! ✅",
            "Благодарим ви! Ще се свържем с вас скоро.",
            [{
                text: "OK",
                onPress: () => setCartItems([]),
            }]
        );
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛒 Количка</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🛒</Text>
                    <Text style={styles.emptyText}>Количката е празна</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛒 Количка</Text>
            </View>

            {/* Render Cart Items */}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.stockID.toString()}
                renderItem={({ item }) => (
                    <ProductCartItemCard
                        item={item}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleRemove={handleRemove}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Checkout Button */}
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
    emptyContainer: {
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
});