import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import ClothesSquareIcon from '@/icons/categories/ClothesSquareIcon';
import { fetchCategories } from '@/states/filter/fetchCategories';
import { NunitoBold, NunitoMedium, e5Color, f5Color, primaryColor } from '@/styles/variables';
import BagSquareIcon from '@/icons/categories/BagSquareIcon';
import AccessoriesSquareIcon from '@/icons/categories/AccessoriesSquareIcon';
import ShoseSquareIcon from '@/icons/categories/ShoseSquareIcon';
import HealthSquareIcon from '@/icons/categories/HealthSquareIcon';
import { CategoryType } from '@/types/categoryType';
import CustomText from '@/components/ui/CustomText';
import generalStates from '@/states/general/generalStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const CategoriesPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
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

    useEffect(() => {
        if (mainCategory && !subCategory) {
            generalStates.setCategoryPageLevel(1);
        } else if (mainCategory && subCategory) {
            generalStates.setCategoryPageLevel(2);
        } else {
            generalStates.setCategoryPageLevel(0);
        }
    }, [mainCategory, subCategory]);

    useEffect(() => {
        if (generalStates.categoryPageLevel === 0) {
            setMainCategory(null);
            setSubCategory(null);
        } else if (generalStates.categoryPageLevel === 1) {
            setSubCategory(null);
        } else {
            setMainCategory(1);
        }
    }, [generalStates.categoryPageLevel]);

    const mainCat = categories
        .find((category) => category.id === mainCategory)
        ?.name_az.replace(/\//g, ',');

    const subCat = categories
        .find((category) => category.id === subCategory)
        ?.name_az.replace(/\//g, ',');

    return (
        <>
            <View style={internalStyles.breadcrumbContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setMainCategory(mainCategory);
                        setSubCategory(null);
                    }}
                >
                    <CustomText style={internalStyles.breadcrumb}>{mainCat}</CustomText>
                </TouchableOpacity>
                <CustomText style={{ display: subCategory ? 'flex' : 'none' }}> / </CustomText>
                <CustomText style={{ ...internalStyles.breadcrumb, color: primaryColor }}>
                    {subCategory && subCat}
                </CustomText>
            </View>
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

                                    setSubCategory(null);
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
                                        // check sub category exists
                                        if (
                                            categories.find(
                                                (category) => category.parent_id === item.id,
                                            )
                                        ) {
                                            setSubCategory(item.id);
                                        } else {
                                            console.log('item', item);
                                            filterStates.setQuery('categories', [item]);
                                            navigate.navigate('ProductsPage');
                                        }
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
        </>
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
    breadcrumbContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: e5Color,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    breadcrumb: {
        textAlign: 'right',
        fontSize: 14,
        fontFamily: NunitoBold,
    },
});
