import { request, response, Router } from "express"

import { CategoriesRepository } from "../repositories/CategoryRepository"

const categoriesRoutes = Router()

const categoryRepository = new CategoriesRepository()


categoriesRoutes.post('/', (request, response) => {
    const { name , description } = request.body

    const categoryAlreadyExists = categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
        return response.status(400).json({ message: "Category Alredy Exists"})
    }

    categoryRepository.create({ name, description })

    return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
    const categoryList = categoryRepository.list()

    return response.json(categoryList).status(201)
})

export { categoriesRoutes }