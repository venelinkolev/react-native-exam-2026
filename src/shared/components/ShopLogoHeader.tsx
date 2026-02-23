import { StyleSheet, View, Text, Image } from "react-native";

export default function ShopLogoHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Онлайн магазин React</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../assets/react-logo.png")}
                    style={styles.logo}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    header: {
        backgroundColor: "#3478f6",
        padding: 15,
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 15,
    },
    logo: {
        width: 100,
        height: 88,
    },
});