import React from "react";
import { FlatList, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalHeader from "../components/GlobalHeader";
import FloatingButtonModal from "components/FloatingButtonModal";
import {
    Safe,
    Row,
    Timeline,
    LineTop,
    LineBottom,
    IconCircle,
    Content,
    TopRow,
    Title,
    DateText,
    Subtitle,
    BottomRow,
    Odometer,
    Amount
}
    from "../styles/HistoryScreen.styles";

type Item = {
    id: string;
    type: "refuel" | "fixed" | "ride" | "other";
    title: string;
    date: string;
    odometer: number;
    amount?: number;
    subtitle?: string;
};

const mock: Item[] = [
    { id: "1", type: "refuel", title: "Próximo abastecimento", date: "15 jul", odometer: 24241, subtitle: "Em 118 km" },
    { id: "2", type: "fixed", title: "Fixo", date: "05 jul", odometer: 24123, amount: 75 },
    { id: "3", type: "ride", title: "Aplicativo de transporte", date: "05 jul", odometer: 24123, amount: 87 },
    { id: "4", type: "refuel", title: "Abastecimento", date: "05 jul", odometer: 24123, amount: 20, subtitle: "Rede Ps" },
    { id: "5", type: "refuel", title: "Abastecimento", date: "05 jul", odometer: 24005, amount: 20, subtitle: "Rede Ps" },
    { id: "6", type: "ride", title: "Aplicativo de transporte", date: "04 jul", odometer: 24003, amount: 67 },
    { id: "7", type: "fixed", title: "Fixo", date: "04 jul", odometer: 23981, amount: 135 },
];

export default function HistoryScreen() {
    return (
        <>
            <Safe>
                <StatusBar barStyle="light-content" backgroundColor="#00a8a8" />
                <GlobalHeader />
                <FlatList
                    data={mock}
                    keyExtractor={(i) => i.id}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item, index }) => <HistoryItem item={item} isFirst={index === 0} />}
                />
            </Safe>
            <FloatingButtonModal/>
        </>
    );
}

function HistoryItem({ item, isFirst }: { item: Item; isFirst?: boolean }) {
    const iconName = (() => {
        switch (item.type) {
            case "refuel": return "gas-station";
            case "fixed": return "credit-card-outline";
            case "ride": return "taxi";
            default: return "file-document-outline";
        }
    })();

    const bgColor = item.type === "refuel" ? "#ffb74d" : item.type === "fixed" ? "#8bc34a" : "#4db6ac";

    return (
        <Row>
            <Timeline>
                <LineTop visible={!isFirst} />
                <IconCircle style={{ backgroundColor: bgColor }}>
                    <MaterialCommunityIcons name={iconName} size={20} />
                </IconCircle>
                <LineBottom />
            </Timeline>

            <Content>
                <TopRow>
                    <Title>{item.title}</Title>
                    <DateText>{item.date}</DateText>
                </TopRow>

                {item.subtitle ? <Subtitle>{item.subtitle}</Subtitle> : null}

                <BottomRow>
                    <Odometer>📍 {item.odometer} km</Odometer>
                    {item.amount !== undefined ? <Amount>R$ {item.amount.toFixed(2)}</Amount> : null}
                </BottomRow>
            </Content>
        
        </Row>
    );
}
