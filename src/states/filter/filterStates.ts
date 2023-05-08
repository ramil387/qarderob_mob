import { BrandType } from "@/types/brandType";
import { CategoryType } from "@/types/categoryType";
import { CityType } from "@/types/cityType";
import { ColorType } from "@/types/colorType";
import { SizeType } from "@/types/sizeType";
import { makeAutoObservable, runInAction } from "mobx";


type QueryType = {
    brand: any,
    city: any,
    color: any,
    size: any,
    price: any,
    productStatus: any,
    categories: any,
}
class FilterStates {

    cities: CityType[] = [];
    sortedCategories: CategoryType[] = [];
    brands: BrandType[] = [];
    colors: ColorType[] = [];
    sizes: SizeType[] = [];
    productStatus: Array<{ label: string, id: number }> = [{ label: "Yeni", id: 1 }, { label: "Yeni və etiketli", id: 2 }, { label: "Az istifadə olunmuş", id: 3 }];
    prices: number[] = [];

    query: QueryType = {
        brand: {},
        city: {},
        color: [],
        size: [],
        price: ['', ''],
        productStatus: [],
        categories: [],

    };

    isLoadingFilter: boolean = false;
    // for back page
    categoryLevel: number = 0;

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

    setQuery = (key: keyof QueryType, val: any) => {
        runInAction(() => {
            this.query[key] = val
        })
    }

    setIsLoadingFilter = (isLoadingFilter: boolean) => {
        runInAction(() => {
            this.isLoadingFilter = isLoadingFilter
        })
    }

    setCategoryLevel = (categoryLevel: number) => {
        runInAction(() => {
            this.categoryLevel = categoryLevel
        })
    }

    resetAllFilters = (page?: string) => {
        if (page === 'FilterPage') {
            runInAction(() => {
                this.query = {} as QueryType
            })
        } else if (page === 'CategoryFilterPage') {
            runInAction(() => {
                this.query.categories = []
            })
        } else if (page === 'BrandFilterPage') {
            runInAction(() => {
                this.query.brand = {}
            })
        } else if (page === 'PriceFilterPage') {
            runInAction(() => {
                this.query.price = []
            })
        } else if (page === 'ColorFilterPage') {
            runInAction(() => {
                this.query.color = [] as QueryType['color']
            })
        } else if (page === 'SizeFilterPage') {
            runInAction(() => {
                this.query.size = [] as QueryType['size']
            })
        } else if (page === 'CityFilterPage') {
            runInAction(() => {
                this.query.city = {} as QueryType['city']
            })
        } else if (page === 'ProductStatusFilterPage') {
            runInAction(() => {
                this.query.productStatus = []
            })
        }



    }

}

export default new FilterStates()