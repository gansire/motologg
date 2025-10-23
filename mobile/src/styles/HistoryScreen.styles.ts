import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #00a8a8;
  padding: 14px 16px;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 18px;
`;

export const Timeline = styled.View`
  width: 56px;
  align-items: center;
`;

export const LineTop = styled.View<{ visible?: boolean }>`
  height: 18px;
  width: 2px;
  background: ${({ visible }: { visible?: boolean }) => (visible ? "#bdbdbd" : "transparent")};
  margin-bottom: 6px;
`;

export const LineBottom = styled.View`
  flex: 1;
  width: 2px;
  background: #e0e0e0;
  margin-top: 6px;
`;

export const IconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  elevation: 2;
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 8px;
`;

export const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const DateText = styled.Text`
  color: #9e9e9e;
`;

export const Subtitle = styled.Text`
  color: #666;
  margin-top: 6px;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`;

export const Odometer = styled.Text`
  color: #666;
`;

export const Amount = styled.Text`
  color: #2e8b57;
  font-weight: 700;
`;