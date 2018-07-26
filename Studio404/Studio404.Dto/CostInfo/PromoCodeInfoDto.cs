namespace Studio404.Dto.CostInfo
{
    public class PromoCodeInfoDto
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Info { get; set; }
        public double CostModifier { get; set; }
    }
}