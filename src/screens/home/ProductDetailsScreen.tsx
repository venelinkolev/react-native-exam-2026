import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/navigation.types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route }: Props) {
    const { product } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} лв.</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: "#3478f6",
    },
});