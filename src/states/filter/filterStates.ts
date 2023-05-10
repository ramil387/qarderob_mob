import { BrandType } from "@/types/brandType";
import { CategoryType } from "@/types/categoryType";
import { CityType } from "@/types/cityType";
import { ColorType } from "@/types/colorType";
import { SizeType } from "@/types/sizeType";
import { makeAutoObservable, runInAction } from "mobx";
import userStates from "../user/userStates";
import shopStates from "../shop/shopStates";


type QueryType = {
    brand: any,
    city: any,
    color: any,
    size: any,
    price: any,
    productStatus: any,
    categories: any,
    sortby?: string,
    user_id?: number,
    q?: string,
    store_id?: number,
}
class FilterStates {

    cities: CityType[] = [];
    sortedCategories: CategoryType[] = [];
    brands: BrandType[] = [];
    colors: ColorType[] = [];
    sizes: SizeType[] = [];
    productStatus: Array<{ label: string, id: number }> = [{ label: "Yeni", id: 1 }, { label: "Yeni və etiketli", id: 2 }, { label: "Az istifadə olunmuş", id: 3 }];
    prices: any[] = ['', ''];

    query: QueryType = {
        brand: {},
        city: {},
        color: [],
        size: [],
        price: ['', ''],
        productStatus: [],
        categories: [],
        sortby: undefined,
        user_id: undefined,
        q: undefined,
        store_id: undefined,
    };

    isLoadingFilter: boolean = false;
    // for back page
    categoryLevel: number = 0;

    // filter pages
    selectedCategories: any = []
    selectedProductStatus: any = []
    selectedColors: any = []
    selectedCities: any = []

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

    removeQuery = (key: keyof QueryType) => {
        runInAction(() => {
            delete this.query[key]
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
                this.query = {
                    brand: {},
                    city: {},
                    color: [],
                    size: [],
                    price: ['', ''],
                    productStatus: [],
                    categories: [],
                    user_id: userStates?.selectedAdOwner?.id,
                    store_id: shopStates?.selectedShop?.id,
                } as QueryType
            })
        } else if (page === 'CategoryFilterPage') {
            runInAction(() => {
                this.query.categories = []
                this.selectedCategories = []
            })
        } else if (page === 'BrandFilterPage') {
            runInAction(() => {
                this.query.brand = {}
            })
        } else if (page === 'PriceFilterPage') {
            runInAction(() => {
                this.query.price = []
                this.prices = ['', '']
            })
        } else if (page === 'ColorFilterPage') {
            runInAction(() => {
                this.query.color = [] as QueryType['color']
                this.selectedColors = []
            })
        } else if (page === 'SizeFilterPage') {
            runInAction(() => {
                this.query.size = [] as QueryType['size']
            })
        } else if (page === 'CityFilterPage') {
            runInAction(() => {
                this.query.city = {} as QueryType['city']
                this.selectedCities = []
            })
        } else if (page === 'ProductStatusFilterPage') {
            runInAction(() => {
                this.query.productStatus = []
                this.selectedProductStatus = []
            })
        }
    }

    resetQuery = () => {
        runInAction(() => {
            this.query = {
                brand: {},
                city: {},
                color: [],
                size: [],
                price: ['', ''],
                productStatus: [],
                categories: [],
                user_id: undefined,
                store_id: undefined,
            } as QueryType
            this.selectedCategories = []
        })
    }

    // filter pages
    setSelectedCategories = (selectedCategories: any) => {
        runInAction(() => {
            this.selectedCategories = selectedCategories
        })
    }

    setSelectedProductStatus = (selectedProductStatus: any) => {
        runInAction(() => {
            this.selectedProductStatus = selectedProductStatus
        })
    }

    setSelectedColors = (selectedColors: any) => {
        runInAction(() => {
            this.selectedColors = selectedColors
        })
    }

    setSelectedCities = (selectedCities: any) => {
        runInAction(() => {
            this.selectedCities = selectedCities
        })
    }

}

export default new FilterStates()