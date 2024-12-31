import AuthGuard from "@/app/utils/AuthGuard";
import ListAnalysisModal from "@/components/ListAnalysisModal";
import Navbar from "@/components/Navbar/Navbar";
import Analysis from "@/entity/analysis";
import { RoleEnum } from '@/enums/role.enum';
import { analysisService } from "@/services/service.list";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from './index.style';
import AnalysisDetail from "@/components/AnalysisDetailModal";
import User from "@/entity/user";

const ListUserAnalysis: React.FC = () => {
    const { user } = useLocalSearchParams();
    const parsedUser:User = JSON.parse(user as string);
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
                const userAnalyses = await analysisService.queryByField('userId', parsedUser.id);
                setAnalyses(userAnalyses);
            } catch (error) {
                console.error("Analiz verisi alınırken hata:", error);
                Alert.alert("Hata", "Analizler yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
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

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(false) }}
                >
                    <AnalysisDetail user={parsedUser} onClose={() => { setModalVisible(false) }} selectedAnalysis={selectedAnalysis} />

                </Modal>
            </SafeAreaView>
        </AuthGuard>
    );
};

export default ListUserAnalysis;