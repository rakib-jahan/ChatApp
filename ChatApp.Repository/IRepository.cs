﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ChatApp.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
    }
}
