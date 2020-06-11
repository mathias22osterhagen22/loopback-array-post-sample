import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {People} from '../models';
import {PeopleRepository} from '../repositories';

export class PeopleController {
  constructor(
    @repository(PeopleRepository)
    public peopleRepository : PeopleRepository,
  ) {}

  @post('/peoples', {
    responses: {
      '200': {
        description: 'People model instance',
        content: {'application/json': {schema: getModelSchemaRef(People)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {
            title: 'NewPeople',
            exclude: ['id'],
          }),
        },
      },
    })
    people: Omit<People, 'id'>,
  ): Promise<People> {
    return this.peopleRepository.create(people);
  }

  @get('/peoples/count', {
    responses: {
      '200': {
        description: 'People model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(People) where?: Where<People>,
  ): Promise<Count> {
    return this.peopleRepository.count(where);
  }

  @get('/peoples', {
    responses: {
      '200': {
        description: 'Array of People model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(People, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(People) filter?: Filter<People>,
  ): Promise<People[]> {
    return this.peopleRepository.find(filter);
  }

  @patch('/peoples', {
    responses: {
      '200': {
        description: 'People PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {partial: true}),
        },
      },
    })
    people: People,
    @param.where(People) where?: Where<People>,
  ): Promise<Count> {
    return this.peopleRepository.updateAll(people, where);
  }

  @get('/peoples/{id}', {
    responses: {
      '200': {
        description: 'People model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(People, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(People, {exclude: 'where'}) filter?: FilterExcludingWhere<People>
  ): Promise<People> {
    return this.peopleRepository.findById(id, filter);
  }

  @patch('/peoples/{id}', {
    responses: {
      '204': {
        description: 'People PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {partial: true}),
        },
      },
    })
    people: People,
  ): Promise<void> {
    await this.peopleRepository.updateById(id, people);
  }

  @put('/peoples/{id}', {
    responses: {
      '204': {
        description: 'People PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() people: People,
  ): Promise<void> {
    await this.peopleRepository.replaceById(id, people);
  }

  @del('/peoples/{id}', {
    responses: {
      '204': {
        description: 'People DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.peopleRepository.deleteById(id);
  }
}
