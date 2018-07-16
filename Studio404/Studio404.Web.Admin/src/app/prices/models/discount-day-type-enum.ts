export enum DiscountDayTypeEnum {
    None,
    Workday = 1 << 0,
    Weekend = 1 << 1,
    All = ~(~0 << 2)
}
