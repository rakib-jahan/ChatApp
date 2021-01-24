using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Repository
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        T Create(T entity);
        Task<T> AsyncCreate(T entity);
        T Update(T entity);
    }
}