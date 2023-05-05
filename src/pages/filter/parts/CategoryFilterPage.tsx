import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import { CategoryType } from '@/types/categoryType';
import { FlatList } from 'react-native-gesture-handler';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { NunitoBold, NunitoRegular, e5Color, f5Color, phoneHeight } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};

const CategoryFilterPage = () => {
    const [mainCategoryId, setMainCategoryId] = React.useState<number | null>(null);
    const categories = toJS(filterStates.sortedCategories);
    const [searchKey, setSearchKey] = React.useState<string>('');
    const parentCategories = categories.filter((cat) => !cat.parent_id);

    useEffect(() => {
        if (filterStates.categoryLevel === 0) {
            setMainCategoryId(null);
        }
    }, [filterStates.categoryLevel]);

    return (
        <View style={internalStyles.container}>
            {mainCategoryId && (
                <View style={internalStyles.searchContainer}>
                    <CustomTextInput
                        onChangeText={(text) => setSearchKey(text)}
                        placeholder='Kateqoriya axtar'
                        style={internalStyles.inputStyle}
                        icon={<PrefixIcon />}
                    />
                </View>
            )}
            <View style={{ flex: 1, minHeight: phoneHeight, width: '100%' }}>
                {!mainCategoryId ? (
                    <FlatList
                        contentContainerStyle={{ paddingVertical: mainCategoryId ? 24 : 0 }}
                        data={parentCategories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        ...internalStyles.item,
                                        borderBottomWidth:
                                            index === parentCategories.length - 1 ? 0 : 1,
                                    }}
                                    onPress={() => {
                                        setMainCategoryId(item.id);
                                        filterStates.setCategoryLevel(1);
                                    }}
                                >
                                    <CustomText style={{ fontFamily: NunitoBold }}>
                                        {item.name_az}
                                    </CustomText>
                                    <ChevronRightIcon />
                                </TouchableOpacity>
                            );
                        }}
                        onEndReachedThreshold={0.5}
                    />
                ) : (
                    <MacroCategories mainCategoryId={mainCategoryId} searchKey={searchKey} />
                )}
            </View>
        </View>
    );
};

export default observer(CategoryFilterPage);

const MacroCategories = memo(
    ({ mainCategoryId, searchKey }: { mainCategoryId: number; searchKey: string }) => {
        const categories = toJS(filterStates.sortedCategories);
        const macroCategories = toJS(filterStates.sortedCategories).filter(
            (cat) => cat.parent_id === mainCategoryId,
        );

        const [selectedCategories, setSelectedCategories] = React.useState<CategoryType[]>([]);
        const [perPage, setPerPage] = React.useState<number>(50);

        const selectCategories = (category: CategoryType) => {
            const index = selectedCategories.findIndex(
                (cat: CategoryType) => cat.id === category.id,
            );
            if (index !== -1) {
                const newCategories = [...selectedCategories];
                newCategories.splice(index, 1);
                setSelectedCategories(newCategories);
                return;
            }
            setSelectedCategories([...selectedCategories, category]);
        };

        useEffect(() => {
            filterStates.setQuery('categories', selectedCategories);
        }, [selectedCategories.length]);

        const loadMoreData = () => {
            if (perPage >= macroCategories.length) return;
            setPerPage(perPage + 50);
        };

        const searchedCategories =
            searchKey.length > 0
                ? categories.filter((cat) =>
                      cat.name_az.toLowerCase().includes(searchKey.toLowerCase()),
                  )
                : macroCategories;

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                windowSize={50}
                initialNumToRender={50}
                extraData={searchedCategories}
                onEndReachedThreshold={0.5}
                data={searchedCategories.filter((cat) =>
                    cat.name_az.toLowerCase().includes(searchKey.toLowerCase()),
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    const showFillSquare = selectedCategories.find(
                        (cat: CategoryType) => cat.id === item.id,
                    );
                    return (
                        <View>
                            <TouchableOpacity
                                style={{
                                    ...internalStyles.item,
                                }}
                                onPress={() => selectCategories(item)}
                            >
                                <CustomText
                                    style={{
                                        ...internalStyles.catName,
                                        fontFamily: item.level === 1 ? NunitoBold : NunitoRegular,
                                    }}
                                >
                                    {item.name_az}
                                </CustomText>
                                {showFillSquare ? <FillSquareIcon /> : <OutlineSquareIcon />}
                            </TouchableOpacity>
                            {categories
                                .filter((cat) => cat?.parent_id === item?.id)
                                ?.map((cat) => {
                                    const showFillSquare = selectedCategories.find(
                                        (f: CategoryType) => f.id === cat.id,
                                    );
                                    return (
                                        <TouchableOpacity
                                            key={cat.id}
                                            style={{
                                                ...internalStyles.item,
                                                display: categories.find(
                                                    (f) => cat?.parent_id === item?.id,
                                                )
                                                    ? 'flex'
                                                    : 'none',
                                                paddingLeft: 32,
                                            }}
                                            onPress={() => selectCategories(cat)}
                                        >
                                            <CustomText
                                                style={{
                                                    ...internalStyles.catName,
                                                    fontFamily: NunitoRegular,
                                                }}
                                            >
                                                {cat.name_az}
                                            </CustomText>
                                            {showFillSquare ? (
                                                <FillSquareIcon />
                                            ) : (
                                                <OutlineSquareIcon />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                        </View>
                    );
                }}
                onEndReached={loadMoreData}
            />
        );
    },
);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    prefixIcon: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    searchContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    inputStyle: {
        paddingLeft: 48,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
    catName: {
        fontSize: 16,
        lineHeight: 21,
    },
});
