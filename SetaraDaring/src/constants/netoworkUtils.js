import NetInfo from "@react-native-community/netinfo";

export default isNetworkAvailable = async () => {
        const response = await NetInfo.fetch();
        return response.isConnected;
}