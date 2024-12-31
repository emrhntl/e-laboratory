import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from "./ShowAllGuides.style";
import { Ionicons } from "@expo/vector-icons";
import GuideDetailsModal from "../GuideDetailsModal";
import Guide from "@/entity/guide";

interface ShowAllGuidesContainerProps {
    guides: Guide[];
    onClose: () => void;
}

const ShowAllGuides: React.FC<ShowAllGuidesContainerProps> = ({ guides, onClose }) => {
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const openGuideDetails = (guide: Guide) => {
        setSelectedGuide(guide);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedGuide(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kayıtlı Kılavuzlar</Text>
            <FlatList
                data={guides || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.guideItem}>
                        <Text style={styles.text}>{item.name}</Text>
                        <TouchableOpacity onPress={() => openGuideDetails(item)}>
                            <Text style={[styles.text, { color: "#5C98A4" }]}>Kılavuz Detaylarını Gör</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <GuideDetailsModal
                guide={selectedGuide}
                isVisible={isModalVisible}
                onClose={closeModal}
            />
        </View>
    );
};


export default ShowAllGuides;