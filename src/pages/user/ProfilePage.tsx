import { View, StyleSheet } from 'react-native';
import React from 'react';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { Avatar, Switch } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, inactiveColor, primaryColor } from '@/styles/variables';
import CalendarIcon from '@/icons/user/CalendarIcon';
import moment from 'moment';

const ProfilePage = () => {
    const user = toJS(profileStates.user);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.avatarContainer}>
                <Avatar size={60} rounded source={{ uri: user?.photo }} />
                <View>
                    <CustomText style={internalStyles.username}>{user?.username}</CustomText>
                    <View style={internalStyles.dateContainer}>
                        <CalendarIcon style={{ color: inactiveColor }} />
                        <CustomText style={internalStyles.dateText}>
                            {moment(user?.createdAt).format('ll')} tarixindən Qarderob - da
                        </CustomText>
                    </View>
                    <CustomText style={internalStyles.limit}>
                        Elan limi: {user?._store?._active_package?.limit ?? 0}
                    </CustomText>
                </View>
            </View>
            <View style={internalStyles.modeContainer}>
                <CustomText
                    style={{
                        ...internalStyles.modeText,

                        color: !profileStates.storeMode ? primaryColor : inactiveColor,
                    }}
                >
                    İstifadəçi
                </CustomText>
                <Switch
                    style={{ width: 48 }}
                    onChange={() => {
                        profileStates.setStoreMode(!profileStates.storeMode);
                    }}
                    thumbColor={primaryColor}
                    value={profileStates.storeMode}
                    color={primaryColor}
                />
                <CustomText
                    style={{
                        ...internalStyles.modeText,
                        color: profileStates.storeMode ? primaryColor : inactiveColor,
                    }}
                >
                    Mağaza
                </CustomText>
            </View>
        </View>
    );
};

export default observer(ProfilePage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
    },
    username: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: NunitoMedium,
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    dateText: {
        color: inactiveColor,
    },
    limit: {
        marginTop: 4,
    },
    modeContainer: {
        alignSelf: 'center',
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    modeText: {
        fontFamily: NunitoBold,
        fontSize: 13,
        letterSpacing: 1,
    },
});
