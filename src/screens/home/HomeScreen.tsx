import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";

import { HomeScreenNavigationProp } from "../../types/navigation.types";
import { ProductParam } from "../../types/product.types";
import ProductCard from "../../shared/components/ProductCard";

const MOCK_PRODUCTS: ProductParam[] = [
    { id: 1, name: "Безжични слушалки Sony WH-1000XM5", price: 379.99, category: "Електроника", description: "Най-добрите шумопотискащи слушалки на пазара." },
    { id: 2, name: "Механична клавиатура Keychron K2", price: 129.99, category: "Компютри", description: "Компактна механична клавиатура с RGB подсветка." },
    { id: 3, name: "Смарт часовник Apple Watch SE", price: 299.99, category: "Електроника", description: "Стилен смарт часовник с фитнес проследяване." },
    { id: 4, name: "Безжична мишка Logitech MX Master 3", price: 89.99, category: "Компютри", description: "Ергономична мишка за продуктивна работа." },
    { id: 5, name: "Портативна колонка JBL Charge 5", price: 159.99, category: "Аудио", description: "Водоустойчива колонка с 20 часа автономност." },
    { id: 6, name: "Таблет Samsung Galaxy Tab A9", price: 249.99, category: "Електроника", description: "10.1 инча дисплей, перфектен за развлечения." },
    { id: 7, name: "Уеб камера Logitech C920", price: 74.99, category: "Компютри", description: "Full HD камера за видеоразговори." },
    { id: 8, name: "Лаптоп стойка UGREEN", price: 34.99, category: "Аксесоари", description: "Алуминиева стойка за лаптоп с регулируема височина." },
];

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const handleProductPress = (product: ProductParam) => {
        navigation.navigate("ProductDetails", { product });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛍️ Онлайн магазин</Text>
            </View>

            <FlatList
                data={MOCK_PRODUCTS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={handleProductPress} />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View>
                        <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
                            Няма налични продукти.
                        </Text>
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
});