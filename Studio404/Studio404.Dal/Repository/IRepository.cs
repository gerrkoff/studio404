using System;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll(params Expression<Func<T, object>>[] includes);
        void Save(T entity);
        void SaveProperties(T entity, params Expression<Func<T, object>>[] properties);
        void Delete(int id);
        T GetById(int id);
    }
}