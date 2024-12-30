import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import AuthGuard from "@/app/utils/AuthGuard";
import { RoleEnum } from '@/enums/role.enum';
import styles from './index.style';
import { useSearchParams } from "expo-router/build/hooks";
import Analysis from "@/entity/analysis";
import { analysisService } from "@/services/service.list";
import AnalysisService from "@/services/analysis.service";
import ListAnalysisModal from "@/components/ListAnalysisModal";
import Navbar from "@/components/Navbar/Navbar";

const ListUserAnalysis: React.FC = () => {
    const { user } = useLocalSearchParams();
    const parsedUser = JSON.parse(user as string);
    const router = useRouter();
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

    useEffect(() => {
        const fetchAnalyses = async () => {
            if (!parsedUser.id) {
                return;
            }
            try {
                const analysisService = AnalysisService.getInstance();
                const userAnalyses = await analysisService.queryByField('userId', parsedUser.id);  // userId'ye göre analizleri çek
                setAnalyses(userAnalyses);  // Analizleri state'e aktar
            } catch (error) {
                console.error("Analiz verisi alınırken hata:", error);
                Alert.alert("Hata", "Analizler yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);  // Yüklenme bitince state'i güncelle
            }
        };

        fetchAnalyses();
    }, [parsedUser.id]);


    const renderItem = ({ item }: { item: Analysis }) => {

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);  // Tarih
            const day = String(date.getDate()).padStart(2, '0'); // Gün
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
            const year = date.getFullYear(); // Yıl

            return `${day}.${month}.${year}`;
        };

        return (
            <View key={item.id} style={styles.card}>
                <View style={styles.values}>
                    <Text style={styles.dateTitle}>Tarih: {formatDate(item.createDate)}</Text>
                    <TouchableOpacity style={styles.detailButton} onPress={() => { setModalVisible(true); setSelectedAnalysis(item) }} >
                        <Text style={{ color: "#5C98A4", fontWeight: "500" }}>Detayları Gör</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    return (
        <AuthGuard allowedRoles={[RoleEnum.ADMIN]} >
            <Stack.Screen options={{ title: 'ListUserAnalysis!' }} />
            <SafeAreaView style={styles.container}>
                <Navbar />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>TAHLİLLER</Text>
                    <View style={{ marginVertical: "4%" }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : analyses.length > 0 ? (
                            <FlatList
                                data={analyses}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                            />
                        ) : (
                            <Text>Bu kullanıcıya ait analiz bulunmamaktadır.</Text>
                        )}
                    </View>
                </View>
                <ListAnalysisModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    selectedAnalysis={selectedAnalysis}
                />
            </SafeAreaView>
        </AuthGuard>
    );
};

export default ListUserAnalysis;