using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Studio404.Dal.Repository
{
	public class Repository<T> : RepositoryNonDeletable<T>, IRepository<T> where T : DeletableEntity
	{
		public Repository(DbContext context) : base(context)
		{
		}

		public void DeleteHard(int id)
		{
			base.Delete(id);
		}

		public override void Delete(int id)
		{
			var entity = Activator.CreateInstance<T>();
			entity.Id = id;
			entity.IsDeleted = true;
			SaveProperties(entity, x => x.IsDeleted);
		}

		public override IQueryable<T> GetAll(params Expression<Func<T, object>>[] includes)
		{
			return base.GetAll(includes).Where(x => !x.IsDeleted);
		}

		public IQueryable<T> GetAllIncludeDeleted(params Expression<Func<T, object>>[] includes)
		{
			return base.GetAll(includes);
		}
	}
}