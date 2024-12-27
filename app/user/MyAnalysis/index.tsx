import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Stack, useRouter } from "expo-router";
import Navbar from "@/components/Navbar/Navbar";
import styles from './index.style';
import { analysisService } from "@/services/service.list";
import Analysis from "@/entity/analysis";
import { auth } from "@/constants/firebaseConfig";
import ListAnalysisModal from "@/components/ListAnalysisModal";
import DateFilter from "@/components/DateFilter";
import AuthGuard from "@/app/utils/AuthGuard";
import { RoleEnum } from "@/enums/role.enum";

const MyAnalysis: React.FC = () => {
    const [analysis, setAnalysis] = useState<Analysis[]>([]);
    const [filteredAnalysis, setFilteredAnalysis] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                console.warn('Kullanıcı oturumu açık değil.');
                setUserId(null);
                setLoading(false);
                Alert.alert('Hata', 'Lütfen oturum açın.');
                router.replace('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchAnalysis = async () => {
            try {
                const userAnalysis = await analysisService.queryByField('userId', userId);
                setAnalysis(userAnalysis);
                setFilteredAnalysis(userAnalysis);
            } catch (error) {
                console.error('Tahlil verisi alınırken hata:', error);
                Alert.alert('Hata', 'Tahliller yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [userId]);

    const filterByDate = (startDate: Date | null, endDate: Date | null) => {
        if (startDate && endDate) {
            const filtered = analysis.filter(item => {
                const itemDate = new Date(item.createDate);
                return itemDate >= startDate && itemDate <= endDate;
            });
            setFilteredAnalysis(filtered);
        } else {
            Alert.alert('Hata', 'Lütfen başlangıç ve bitiş tarihlerini seçin.');
        }
    };



    const renderItem = ({ item }: { item: Analysis }) => {
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);  // Tarih
            const day = String(date.getDate()).padStart(2, '0'); // Gün
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
            const year = date.getFullYear(); // Yıl

            return `${day}.${month}.${year}`;
        };

        return (
            <View style={styles.card} >
                <View style={styles.values}>
                    <Text style={styles.dateTitle}>Tarih: {formatDate(item.createDate)}</Text>
                    <TouchableOpacity style={styles.detailButton} onPress={() => { setModalVisible(true); setSelectedAnalysis(item) }} >
                        <Text style={{ color: "#5C98A4", fontWeight: "500" }}>Detayları Gör</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Tahliller yükleniyor...</Text>
            </View>
        );
    }

    if (analysis.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Bu kullanıcıya ait tahlil bulunamadı.</Text>
            </View>
        );
    }

    return (
        <AuthGuard allowedRoles={[RoleEnum.USER]}>
            <Stack.Screen options={{ title: 'My Analysis' }} />
            <SafeAreaView style={styles.container}>
                <Navbar />
                <Text style={[styles.title]}>TAHLİLLERİM</Text>
                <DateFilter onFilter={filterByDate} />
                <View style={styles.contentContainer}>
                    <FlatList
                        data={filteredAnalysis}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>

                <ListAnalysisModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    selectedAnalysis={selectedAnalysis}
                />
            </SafeAreaView>

        </AuthGuard>
    );
}

export default MyAnalysis;