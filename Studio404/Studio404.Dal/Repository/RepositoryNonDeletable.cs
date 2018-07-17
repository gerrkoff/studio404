using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Studio404.Dal.Repository
{
    public class RepositoryNonDeletable<T> : IRepositoryNonDeletable<T> where T : BaseEntity
    {
        protected readonly DbContext _context;

        public RepositoryNonDeletable(DbContext context)
        {
            _context = context;
        }

		protected DbSet<T> Entities => _context.Set<T>();

        public virtual IQueryable<T> GetAll(params Expression<Func<T, object>>[] includes)
        {
            if (includes == null || includes.Length == 0)
                return Entities.AsQueryable();

            IIncludableQueryable<T, object> query = null;
            foreach (Expression<Func<T,object>> include in includes)
            {
                query = Entities.Include(include);
            }
            
            return query.AsQueryable();
        }

        public virtual void Save(T entity)
        {
            if(entity.Id == 0)
            {
                Entities.Add(entity);
            }
            _context.SaveChanges();
        }

        public virtual void SaveProperties(T entity, params Expression<Func<T, object>>[] properties)
        {
            if (entity.Id == 0)
            {
                return;
            }

            Entities.Attach(entity);

			IList<string> propertiesToSave = properties
				.Select(x => _context.Entry(entity).Property(x))
				.Select(x => x.Metadata.GetFieldName())
				.ToList();

			foreach (var property in _context.Entry(entity).Properties)
			{
				property.IsModified = propertiesToSave.Contains(property.Metadata.GetFieldName());
			}

			_context.SaveChanges();
        }

        public virtual void Delete(int id)
        {
            var entity = Activator.CreateInstance<T>();
            entity.Id = id;			
			Entities.Attach(entity);
			DeleteCore(entity);
        }

		public virtual void Delete(T entity)
		{
			DeleteCore(entity);
		}

		public virtual T GetById(int id)
        {
            return Entities.Find(id);
        }

		private void DeleteCore(T entity)
		{
			Entities.Remove(entity);
			_context.SaveChanges();
		}
	}
}