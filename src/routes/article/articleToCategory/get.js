/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import _ from 'underscore'

import validation from '@/validations/article/articleToCategory/get'
// import permission from '@/permissions/article/get'
export default [
    queryValidator(validation),
  /*
    permissionFilter(
        {
            role: 'user',
            action: 'user.get',
            criteria: {
                '_userId': ':userId'
            }
        },
        {
            role: 'operator',
            action: 'user.get',
            criteria: {}
        },
        {
            role: 'store',
            action: 'user.get',
            criteria: {}
        },
        {
            role:'admin',
            action:'user.get',
            criteria:{}
        }
    ),
*/
    async (ctx, next) => {
        let query = models.ArticleToCategory;
        let copyOfQuery = _.omit(ctx.params, 'filterBy', 'filterOperator', 'filterValue');

        query = query.find(copyOfQuery);

        let filterBy = [];
        let filterOperator = [];
        let filterValue = [];

        if (ctx.params.filterBy && ctx.params.filterOperator && ctx.params.filterValue) {
            filterBy = ctx.params.filterBy.split(',');
            filterOperator = ctx.params.filterOperator.split(',');
            filterValue = ctx.params.filterValue.split(',');
        }

        if (filterBy.length !== filterOperator.length || filterBy.length !== filterValue.length) {
            throw errors.ARTICLE.QUERY_ERROR;
        }
        for (let i = 0; i < filterBy.length; i++) {
            query = query.where(filterBy[i])[filterOperator[i]](isNaN(filterValue[i])?filterValue[i]:Number(filterValue[i]));
        }

        let result = await query.lean().exec();

        send(ctx, result)
        await next()
    }
]
