import {
    ActivityIndicator,
    Dimensions,
    Modal,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
// import colors from '../config/colors';


function Loader() {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent
                // visible={isLoading}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size="large" color={COLORS.primary.primary_500} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Loader;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        justifyContent: 'center',
        margin: 20,
        opacity: 0.8,
        backgroundColor: COLORS.neutral.neutral_700,
        borderRadius: 15,
        height: Dimensions.get('window').height * 2,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
