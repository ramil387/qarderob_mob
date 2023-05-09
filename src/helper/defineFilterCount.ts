
export const defineFilterCount = (queries: any) => {
    return Object.keys(queries).filter((filter: string) => ['brand', 'city', 'color', 'size', 'price', 'productStatus', 'categories'].includes(filter))
        .map((filter: any) => {
            const filterValue = queries[filter as keyof typeof queries];
            if (Array.isArray(filterValue)) {
                return (
                    filterValue.length -
                    (filter === 'price'
                        ? filterValue[0] === '' && filterValue[0] === ''
                            ? 2
                            : 0
                        : 0)
                );
            } else if (typeof filterValue === 'object' && Object.keys(filterValue).length > 0) {
                return Object.keys(filterValue).length;
            } else {
                return 0;
            }
        })
        .reduce((a, b) => a + b, 0);
    ;
}