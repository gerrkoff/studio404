using System;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Repository
{
    public interface IRepository<T> : IRepositoryNonDeletable<T>
		where T : DeletableEntity
    {
        IQueryable<T> GetAllIncludeDeleted(params Expression<Func<T, object>>[] includes);
		void DeleteHard(int id);
		void DeleteHard(T entity);
	}
}