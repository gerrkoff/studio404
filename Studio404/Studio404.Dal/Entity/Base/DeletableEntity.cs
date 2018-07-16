namespace Studio404.Dal.Entity.Base
{
	public class DeletableEntity : BaseEntity
	{
		public bool IsDeleted { get; set; }
	}
}