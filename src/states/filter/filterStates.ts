import { BrandType } from "@/types/brandType";
import { CategoryType } from "@/types/categoryType";
import { CityType } from "@/types/cityType";
import { ColorType } from "@/types/colorType";
import { SizeType } from "@/types/sizeType";
import { makeAutoObservable, runInAction } from "mobx";

class FilterStates {

    cities: CityType[] = [];
    sortedCategories: CategoryType[] = [];
    brands: BrandType[] = [];
    colors: ColorType[] = [];
    sizes: SizeType[] = [];
    productStatus: Array<{ label: string, id: number }> = [{ label: "Yeni", id: 1 }, { label: "Yeni və etiketli", id: 2 }, { label: "Az istifadə olunmuş", id: 3 }];
    prices: number[] = [];

    query: any = {};

    isLoadingFilter: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }
    setCities = (cities: any) => {
        runInAction(() => {
            this.cities = cities
        })
    }

    setSortedCategories = (categories: any) => {
        runInAction(() => {
            this.sortedCategories = categories
        })
    }

    setBrands = (brands: any) => {
        runInAction(() => {
            this.brands = brands
        })
    }

    setColors = (colors: any) => {
        runInAction(() => {
            this.colors = colors
        })
    }

    setSizes = (sizes: any) => {
        runInAction(() => {
            this.sizes = sizes
        })
    }

    setPrices = (prices: any) => {
        runInAction(() => {
            this.prices = prices
        })
    }

    setProductStatus = (productStatus: any) => {
        runInAction(() => {
            this.productStatus = productStatus
        })
    }

    setQuery = (query: any) => {
        runInAction(() => {
            this.query = query
        })
    }

    setIsLoadingFilter = (isLoadingFilter: boolean) => {
        runInAction(() => {
            this.isLoadingFilter = isLoadingFilter
        })
    }

}

export default new FilterStates()