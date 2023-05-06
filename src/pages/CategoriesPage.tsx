import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import ClothesSquareIcon from '@/icons/categories/ClothesSquareIcon';
import { fetchCategories } from '@/states/filter/fetchCategories';
import { NunitoMedium, f5Color, primaryColor } from '@/styles/variables';
import BagSquareIcon from '@/icons/categories/BagSquareIcon';
import AccessoriesSquareIcon from '@/icons/categories/AccessoriesSquareIcon';
import ShoseSquareIcon from '@/icons/categories/ShoseSquareIcon';
import HealthSquareIcon from '@/icons/categories/HealthSquareIcon';
import { CategoryType } from '@/types/categoryType';
import CustomText from '@/components/ui/CustomText';

const CategoriesPage = () => {
    const [mainCategory, setMainCategory] = React.useState<number | null>(1);
    const [subCategory, setSubCategory] = React.useState<number | null>(null);
    const categories = toJS(filterStates.sortedCategories);
    const parentCategories = categories.filter((category) => !category.parent_id);

    useEffect(() => {
        fetchCategories();
    }, []);

    const activeBackground = primaryColor;
    const activeTextColor = 'white';
    const inactiveBackground = f5Color;
    const inactiveTextColor = '#999999';

    const commonStyle = (category: CategoryType) => ({
        backgroundColor: mainCategory === category.id ? activeBackground : inactiveBackground,
        color: mainCategory === category.id ? activeTextColor : inactiveTextColor,
    });

    return (
        <View style={internalStyles.container}>
            <View style={{ width: '20%' }}>
                {parentCategories.map((category) => {
                    const style = commonStyle(category);
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={internalStyles.leftItemContainer}
                            onPress={() => {
                                setMainCategory(category.id);
                            }}
                        >
                            {category.id === 1 && <ClothesSquareIcon style={style} />}
                            {category.id === 4 && <BagSquareIcon style={style} />}
                            {category.id === 5 && <AccessoriesSquareIcon style={style} />}
                            {category.id === 3 && <ShoseSquareIcon style={style} />}
                            {category.id === 6 && <HealthSquareIcon style={style} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={{ width: '80%' }}>
                <FlatList
                    contentContainerStyle={{ rowGap: 8 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={categories.filter(
                        (category) =>
                            category.parent_id === (subCategory ? subCategory : mainCategory),
                    )}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.level === 2) return;
                                    setSubCategory(item.id);
                                }}
                                style={internalStyles.itemStyle}
                            >
                                <CustomText style={internalStyles.catName}>
                                    {item.name_az}
                                </CustomText>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default observer(CategoriesPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
    },
    leftItemContainer: {
        marginVertical: 4,
    },
    itemStyle: {
        width: '48%',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        borderColor: '#FF8BA5',
        marginTop: 4,
        height: 60,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    catName: {
        textAlign: 'center',
        fontFamily: NunitoMedium,
    },
});
