import React from "react";
import { View, Text, Modal, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import styles from './index.style';
import Guide from "@/entity/guide";
import Audit from "@/entity/audit";
import { Ionicons } from "@expo/vector-icons";
import AuditValues from "@/entity/audit.values";

interface GuideDetailsModalProps {
    guide: Guide | null;
    isVisible: boolean;
    onClose: () => void;
}

const GuideDetailsModal: React.FC<GuideDetailsModalProps> = ({ guide, isVisible, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
                        <Ionicons name="close-outline" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.mainTitle}>{guide?.name.toUpperCase()}</Text>
                    <Text style={styles.mainDescription}>
                        {guide?.description}
                    </Text>

                    <FlatList
                        data={guide?.auditList || []}
                        keyExtractor={(item) => item.auditName}
                        renderItem={({ item }) => (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, {fontSize:16, marginTop:"2%"}]}>{item.auditName} ({item.unit})</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.headerText}>Age</Text>
                                    <Text style={styles.headerText}>Geometric Mean±SD</Text>
                                    <Text style={styles.headerText}>Min-Max</Text>
                                    <Text style={styles.headerText}>95% Confidence Intervals</Text>
                                </View>
                                {Object.values(item.valueRanges).map((range: any, index: number) => (
                                    <View key={index} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>
                                            {range.minAgeValue}-{range.maxAgeValue} ({range.ageType})
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {range.avarage}±{range.standartDeviation}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {range.minValue}-{range.maxValue}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {range.ciMinValue}-{range.ciMaxValue}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default GuideDetailsModal;
