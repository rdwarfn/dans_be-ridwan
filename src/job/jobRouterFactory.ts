import { Router } from "express";
import paginate from "express-paginate";
import { Job } from "./Job";
import { Repository } from "sequelize-typescript";

import dotenv from "dotenv";
import connection from "../database/connection";
import { Op, FindAndCountOptions } from "sequelize";
dotenv.config();

export const jobRouterFactory = (
  jobRepository: Repository<Job>,
) => Router()

  .post('/posts', async (req, res, next) => {
    console.log("*** req.body", req.body)
    const transaction = await connection.transaction();

    try {
      const jobs_creation = await jobRepository.bulkCreate(req.body, {
        returning: true,
        transaction,
        logging: console.log
      })

      await transaction.commit();
      res.status(200).json(jobs_creation);
    } catch (err: any) {
      await transaction.rollback();
      res.status(200).json({
        code: 500,
        message: 'Failed on creating jobs.',
        data: err.toString()
      })
    }
  })

  .post('/search', async (req, res, next) => {
    try {
      const whereOptions = searchOptions(req.body)
        ? { where: searchOptions(req.body) }
        : {};
      const paginateOptions: FindAndCountOptions = {
        limit: Number(req.query.limit),
        offset: Number(req.skip)
      };

      const results = await jobRepository.findAndCountAll(Object.assign(
        whereOptions,
        paginateOptions
      ));

      const page_count = Math.ceil(Number(results.count) / Number(req.query.limit));
      const item_count = results.count;
      res.status(200).json({
        code: 200,
        message: 'Successful',
        data: {
          jobs: results.rows,
          item_count,
          page_count,
          pages: paginate.getArrayPages(req)(10, page_count, Number(req.query.page)),
          page: Number(req.query.page)
        }
      });
    } catch (err: any) {
      res.status(200).json({
        code: 500,
        message: 'Failed to searching a jobs.',
        data: err.toString()
      })
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const whereOptions = searchOptions(req.body)
        ? { where: searchOptions(req.body) }
        : {};
      const paginateOptions: FindAndCountOptions = {
        limit: Number(req.query.limit),
        offset: Number(req.skip)
      };

      const results = await jobRepository.findAndCountAll(Object.assign(
        whereOptions,
        paginateOptions
      ));

      const page_count = Math.ceil(Number(results.count) / Number(req.query.limit));
      const item_count = results.count;

      res.status(200).json({
        code: 200,
        message: 'Successful',
        data: {
          jobs: results.rows,
          item_count,
          page_count,
          pages: paginate.getArrayPages(req)(10, page_count, Number(req.query.page)),
          page: Number(req.query.page)
        }
      })
    } catch (err: any) {
      res.status(200).json({
        code: 500,
        message: 'Internal Server Error',
        data: err.toString()
      })
    }
  })

interface jobSearchProp {
  type?: string | null
  location?: string | null
  description?: string | null
}
function searchOptions (props: jobSearchProp) {
  let _options = { where: {} };
  const { description = null, location = null, type = null } = props;

  if (!!description) {
    _options.where = Object.assign(_options.where, {
      description: {
        [Op.iLike]: `%${description}%`
      }
    })
  }

  if (!!location) {
    _options.where = Object.assign(_options.where, {
      location: {
        [Op.iLike]: `%${location}%`
      }
    });
  }

  if (!!type) {
    _options.where = Object.assign(_options.where, {
      type: {
        [Op.iLike]: `%${type}%`
      }
    })
  }

  return _options.where;
}
