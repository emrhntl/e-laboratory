import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './admin.tabs.style';
import { usePathname } from 'expo-router';

interface AdminTabsProps {
    router: any;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ router }) => {
    const currentPath = usePathname();

    const tabRows = [
        [
            { label: 'Hasta Takip', path: '/admin/PatientTracking', style: styles.btn1 },
            { label: 'Tetkik Ekle', path: '/admin/AddAudit', style: styles.btn2 },
        ],
        [
            { label: 'Kılavuz Ekle', path: '/admin/CreateGuide', style: styles.btn3 },
            { label: 'Tahlil Ekle', path: '/admin/CreateAnalysis', style: styles.btn4 },
        ],
    ];

    const handleNavigation = (path: string) => {
        if (currentPath !== path) router.replace(path);
    };

    return (
        <View style={styles.buttonContainer}>
            {tabRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((tab) => (
                        <TouchableOpacity
                            key={tab.path}
                            style={[
                                styles.baseButton,
                                tab.style,
                                currentPath === tab.path && styles.selectedButton,
                            ]}
                            onPress={() => handleNavigation(tab.path)}
                        >
                            <Text
                                style={[
                                    styles.baseButtonText,
                                    currentPath === tab.path && styles.selectText,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default AdminTabs;
