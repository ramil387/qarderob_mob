import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
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
import { NunitoBold, NunitoRegular, e5Color, f5Color } from '@/styles/variables';
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

    const parentCategories = categories.filter((cat) => !cat.parent_id);

    useEffect(() => {
        if (filterStates.categoryLevel === 0) {
            setMainCategoryId(null);
        }
    }, [filterStates.categoryLevel]);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    placeholder='Kateqoriya axtar'
                    style={internalStyles.inputStyle}
                    icon={<PrefixIcon />}
                />
            </View>
            {!mainCategoryId ? (
                <FlatList
                    contentContainerStyle={{ paddingVertical: 24 }}
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
                                <CustomText>{item.name_az}</CustomText>
                                <ChevronRightIcon />
                            </TouchableOpacity>
                        );
                    }}
                    windowSize={5}
                    getItemLayout={(data, index) => ({ length: 53, offset: 53 * index, index })}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={20}
                />
            ) : (
                <MacroCategories mainCategoryId={mainCategoryId} />
            )}
        </View>
    );
};

export default observer(CategoryFilterPage);

const MacroCategories = ({ mainCategoryId }: { mainCategoryId: number }) => {
    const macroCategories = toJS(filterStates.sortedCategories).filter(
        (cat) => cat.parent_id === mainCategoryId,
    );
    const [selectedCategories, setSelectedCategories] = React.useState<CategoryType[]>([]);
    const [perPage, setPerPage] = React.useState<number>(50);

    const selectCategories = (category: CategoryType) => {
        const index = selectedCategories.findIndex((cat: CategoryType) => cat.id === category.id);
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
    return (
        <FlatList
            // contentContainerStyle={{ paddingVertical: 24 }}
            data={macroCategories}
            keyExtractor={(item) => item.id.toString()}
            windowSize={50}
            initialNumToRender={50}
            extraData={macroCategories}
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
                        <View style={{ paddingLeft: 24 }}>
                            <MacroCategories mainCategoryId={item.id} />
                        </View>
                    </View>
                );
            }}
            getItemLayout={(data, index) => ({ length: 53, offset: 53 * index, index })}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreData}
        />
    );
};

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
