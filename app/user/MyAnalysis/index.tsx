import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import Navbar from "@/components/Navbar/Navbar";
import styles from './index.style';

const MyAnalysis: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'myAnalysis!' }} />
            <SafeAreaView style={styles.container}>
                <Navbar />
                <View>
                    <Text>My Analysis</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

export default MyAnalysis;