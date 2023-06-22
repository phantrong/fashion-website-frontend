export interface IFilterData {
  value: any;
  label: string;
}

export const COSTS: IFilterData[] = [
  {
    label: 'Thỏa thuận',
    value: {
      is_negotiate: 1,
    },
  },
  {
    value: {
      start_cost: 0,
      end_cost: 1000,
    },
    label: 'Dưới 1 triệu',
  },
  {
    value: {
      start_cost: 1000,
      end_cost: 3000,
    },
    label: '1 - 3 triệu',
  },
  {
    value: {
      start_cost: 3000,
      end_cost: 5000,
    },
    label: '3 - 5 triệu',
  },
  {
    value: {
      start_cost: 5000,
      end_cost: 7000,
    },
    label: '5 - 7 triệu',
  },
  {
    value: {
      start_cost: 7000,
      end_cost: 10000,
    },
    label: '7 - 10 triệu',
  },
  {
    value: {
      start_cost: 10000,
    },
    label: 'trên 10 triệu',
  },
];

export const COST_SELECT = COSTS.map((item: IFilterData, index: number) => ({
  ...item,
  value: index,
  valueApi: item?.value,
}));

export const AREAS: IFilterData[] = [
  {
    value: {
      end_acreage: 10,
    },
    label: 'Dưới 10 m²',
  },
  {
    value: {
      start_acreage: 10,
      end_acreage: 20,
    },
    label: '10 - 20 m²',
  },
  {
    value: {
      start_acreage: 20,
      end_acreage: 30,
    },
    label: '20 - 30 m²',
  },
  {
    value: {
      start_acreage: 30,
      end_acreage: 40,
    },
    label: '30 - 40 m²',
  },
  {
    value: {
      start_acreage: 40,
      end_acreage: 50,
    },
    label: '40 - 50 m²',
  },
  {
    value: {
      start_acreage: 50,
    },
    label: 'trên 50 m²',
  },
];
export const AREAS_SELECT = AREAS.map((item: IFilterData, index: number) => ({
  ...item,
  value: index,
  valueApi: item?.value,
}));
