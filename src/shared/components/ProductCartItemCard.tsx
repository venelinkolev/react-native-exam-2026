import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { CartItemAPI } from "../../types/cart.types";

export default function ProductCartItemCard(
    {
        item,
        handleIncrease,
        handleDecrease,
        handleRemove
    }: {
        item: CartItemAPI,
        handleIncrease: (id: number) => void,
        handleDecrease: (id: number) => void,
        handleRemove: (id: number) => void
    }) {

    return (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toFixed(2)} €</Text>
            </View>
            <View style={styles.cardActions}>
                <View style={styles.quantityRow}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleDecrease(item.kasbuf_id)}>
                        <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleIncrease(item.kasbuf_id)}>
                        <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemove(item.kasbuf_id)}>
                    <Text style={styles.removeBtn}>🗑️ Премахни</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cardInfo: {
        marginBottom: 10,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 15,
        color: "#3478f6",
        fontWeight: "bold",
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: "#f0f4ff",
        justifyContent: "center",
        alignItems: "center",
    },
    qtyBtnText: {
        fontSize: 18,
        color: "#3478f6",
        fontWeight: "bold",
    },
    qtyValue: {
        fontSize: 16,
        fontWeight: "bold",
        minWidth: 24,
        textAlign: "center",
    },
    removeBtn: {
        fontSize: 13,
        color: "#e74c3c",
    },
});