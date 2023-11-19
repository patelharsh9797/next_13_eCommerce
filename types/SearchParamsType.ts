type Params = {
    id: string
}

type SearchParam = {
    id: string
    name: string
    unit_amount: number | null
    image: string
    description: string | null
    features: string
}

export type SearchParamType = {
    params: Params
    searchParams: SearchParam
}