import {React} from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    }
});
const Loading = () => {
    return(
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
        </View>
    );
}

export default Loading;
