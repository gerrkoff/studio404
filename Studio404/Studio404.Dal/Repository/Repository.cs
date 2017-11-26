using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Repository
{
    public class Repository<T> : IRepository<T> where T : IEntity
    {
        private readonly IList<T> _list; 
        public Repository(IList<T> list)
        {
            _list = list;
        }
        
        public IQueryable<T> GetAll()
        {
            return _list.AsQueryable();
        }

        public void Save(T entity)
        {
            throw new NotImplementedException();
        }

        public void SaveProperties(T entity, params Expression<Func<T, object>>[] roperties)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}