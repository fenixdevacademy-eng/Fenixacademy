import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Component = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Componente React Native</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Component;
