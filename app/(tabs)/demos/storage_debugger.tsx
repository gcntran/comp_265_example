import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "@/components/utilities/db";
import { Button } from "react-native-paper";

export function StorageDebugger() {
    const [data, setData] = useState<any>({});

    // Load all persisted data from AsyncStorage into local state
    useEffect(() => {
        async function load() {
            const keys = await AsyncStorage.getAllKeys();
            const entries = await AsyncStorage.multiGet(keys);

            const obj: any = {};
            entries.forEach(([k, v]) => {
                try {
                    obj[k] = JSON.parse(v as string);
                } catch {
                    obj[k] = v;
                }
            });

            setData(obj);
        }

        load();
    }, []);

    // Helper to clear local database
    const clearLocalDB = () => {
        Storage.clearAllSync();
        setData({});
    };

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text selectable>{JSON.stringify(data, null, 2)}</Text>
            <Button mode="contained" onPress={() => {
                clearLocalDB();
            }}>
                Clear Local DB
            </Button>
        </ScrollView>
    );
}

export default StorageDebugger;
