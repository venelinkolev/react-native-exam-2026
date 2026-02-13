import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProductParam } from "../../types/product.types";

type Props = {
    product: ProductParam;
    onPress: (product: ProductParam) => void;
};

export default function ProductCard({ product, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>📦</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                {product.category && (
                    <Text style={styles.category}>{product.category}</Text>
                )}
                <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
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
    info: {
        flex: 1,
        justifyContent: "center",
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