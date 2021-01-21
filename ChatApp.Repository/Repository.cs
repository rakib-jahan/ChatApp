using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ChatApp.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DatabaseContext _context;

        public Repository(DatabaseContext context)
        {
            _context = context;
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression).AsNoTracking();
        }

        public void Create(T entity)
        {
            this._context.Set<T>().Add(entity);
            _context.SaveChanges();
        }

        public async Task AsyncCreate(T entity)
        {
            this._context.Set<T>().Add(entity);
            await  _context.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            if (entity != null)
            {
                _context.Entry(entity).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }
    }
}
